import React from 'react';

import audio from '../media/title.mp3';

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

  componentDidMount() {
    this.audio.volume = 0.3;
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
        <audio ref={ref => this.audio = ref} src={audio} autoPlay/>
      </div>
    )
  }
}

export default Crawl;