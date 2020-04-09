import React from 'react';

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
    const { stats } = this.state;
    Object.keys(stats).forEach(stat => {
      if (Array.isArray(stats[stat])){
        if (stats[stat].length > limit) {
          const diff = stats[stat].length - limit;
          stats[stat] = stats[stat].splice(0, limit).join(', ') + ` + ${diff} more`;
        } else {
          stats[stat] = stats[stat].splice(0, limit).join(', ')
        }
        this.setState({ stats });
      }
    });
    
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