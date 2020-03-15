import React from 'react';

import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="links sharethis-inline-share-buttons"></div>
        <p>Designed & developed by <a href="https://malcolmkiano.com" target="_blank" rel="noopener noreferrer">Malcolm Kiano</a>.</p>
      </footer>
    )
  }
}

export default Footer;