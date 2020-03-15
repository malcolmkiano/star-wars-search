import React from 'react';

import './Crawl.css';

class Crawl extends React.Component {
  state = {
    animation: 'fadeIn'
  };

  handleClose = () => {
    this.setState({ animation: 'fadeOut' });
    setTimeout(() => {
      this.props.onClose();
    }, 500);
  }

  render() {
    const {data} = this.props;

    let i = 0;
    const lines = data.content ? data.content.split('\n').map(line => {
      i++;
      return (
        <span key={line + i}>{line}<br/></span>
      )}) : '';
    return (
      <div className={`crawl-space animated ${this.state.animation}`}>
        <button onClick={this.handleClose}>Close</button>
        <div className="crawl">
          <h2>{data.title}</h2>
          <p>
            {lines}
          </p>
        </div>
      </div>
    )
  }
}

export default Crawl;