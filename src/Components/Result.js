import React from 'react';

import api from '../api';

class Result extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ...props.data
    }
  }

  componentDidMount(){
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
        Promise.all(stats[stat].map(url => api.get(url).then(data => data.name || data.title)))
        .then(data => {
          this.setState({
            stats: {
              ...this.state.stats,
              [stat]: data.join(', ')
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
        onClick={this.props.onClick}
        crawl={this.props.hasCrawl}
        style={this.props.style}>
        <h2><button>{name}</button></h2>
        <div className="stats">
          {
            Object.keys(stats).map(stat => {
              return (
                <span key={stat} className="stat">
                  {stat.split('_').join(' ')}: <b>{stats[stat]}</b>
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