import React from 'react';

import './Results.css';

class Results extends React.Component {
  getStats(obj) {
    let data = {...obj}
    Object.keys(data).forEach(stat => {
      if (stat === 'name' ||
        stat === 'title' ||
        stat === 'created' ||
        stat === 'edited' ||
        stat === 'opening_crawl' ||
        typeof data[stat] === 'object' ||
        (typeof data[stat] === 'string' && data[stat].startsWith('https:'))) {
        delete data[stat];
      }
    });
    return data;
  }

  generateResultsList(){
    let i = 0;
    const {data, searched, error} = this.props.rel;
    const list = data.map(item => {

      const stats = this.getStats(item);
      const styleObj = {
        animationDelay: `${i * 0.2}s`
      };
      i++;

      const crawl = {
        title: item['title'],
        content: item['opening_crawl']
      };
      const hasCrawl = crawl.content ? 'yes' : undefined;

      return (
        <li key={item.name || item.title} className="animated fadeInUp" onClick={() => this.props.onShowCrawl(crawl)} crawl={hasCrawl} style={styleObj}>
          <h2><button>{item.name || item.title}</button></h2>
          <div className="stats">
            {
              Object.keys(stats).map(stat => {
                return (
                  <span key={stat} className="stat">
                    {stat.split('_').join(' ')}: <b>{item[stat]}</b>
                  </span>
                )
              })
            }
          </div>
        </li>
      );
    });
    
    return data.length ? list : error ? (
      <p className='error'>{error}. Please try again later.</p>
    ) : searched ? (
      <p>No results found.</p>
    ) : '';
  }

  render() {
    let animation = this.props.show ? 'fadeIn' : 'fadeOut';
    const start = (this.props.rel.page - 1) * 10;
    const viewing = this.props.rel.count > start + 10 ? `Results ${start + 1} - ${start + 10} of ${this.props.rel.count}` : `Results ${start + 1} - ${this.props.rel.count} of ${this.props.rel.count}`;
    return (
      <ul className={`results animated ${animation}`}>
        {this.props.rel.searched && this.props.rel.count > 0 ? (
          <p>{viewing}</p>
        ) : ''}
        {this.generateResultsList()}
        {this.props.rel.searched ? (
          <li className="buttons">
            <button
              className="btn"
              disabled={!this.props.rel.previous}
              onClick={() => this.props.onNavigate(-1)}>Previous page</button>
            <button
              className="btn"
              disabled={!this.props.rel.next}
              onClick={() => this.props.onNavigate(1)}>Next page</button>
          </li>
        ) : ''}
      </ul>
    )
  }
}

export default Results;