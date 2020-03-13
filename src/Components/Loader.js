import React from 'react';

import './Loader.css';

class Loader extends React.Component {
  render() {
    let animation = this.props.show ? 'fadeIn' : 'fadeOut';
    return (
      <div className={`loader animated ${animation}`}>
        <span></span><span></span><span></span>
      </div>
    )
  }
}

export default Loader;