import React from 'react';

import api from '../api';

class Result extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ...props.data
    }
  }

  /** checks each stat and makes necessary extra api calls to populate result */
  componentDidMount(){
    const limit = 3;
    let {stats} = this.state;
    Object.keys(stats).forEach(stat => {
      if (typeof stats[stat] === 'string' && stats[stat].startsWith('http')) {
        api.get(stats[stat])
          .then(data => {
            this.setState({
              stats: {
                ...this.state.stats,
                [stat]: data.name || data.title
              }
            });
          })
      } else if (typeof stats[stat] === 'object') {
        let list = stats[stat].slice(0, limit);
        let sliced = stats[stat].length > limit ? ` + ${stats[stat].length - limit} more` : '';
        Promise.all(list.map(url => api.get(url).then(data => data.name || data.title)))
        .then(data => {
          this.setState({
            stats: {
              ...this.state.stats,
              [stat]: data.join(', ') + sliced
            }
          });
        })
      }
    })
  }

  render() {
    const {name, stats} = this.state;
    return (
      <li
        className="animated fadeInUp"
        crawl={this.props.hasCrawl}
        style={this.props.style}>
        <h2><button onClick={this.props.onClick}>{name}</button></h2>
        <div className="stats">
          {
            Object.keys(stats).map(stat => {
              let val = stats[stat];
              if ((typeof val === 'object' && val[0].startsWith('http')) ||
                  (typeof val === 'string' && val.startsWith('http'))) {
                val = '...';
              }
              return (
                <span key={stat} className="stat">
                  {stat.split('_').join(' ')}: <b>{val}</b>
                </span>
              )
            })
          }
        </div>
      </li>
    )
  }
}

export default Result;