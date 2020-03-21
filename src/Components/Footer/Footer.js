import React from 'react';
import './Footer.css';

import {InlineShareButtons} from 'sharethis-reactjs';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <InlineShareButtons
          config={{
            alignment: 'center',
            enabled: true,
            networks: [
              'facebook',
              'twitter',
              'pinterest',
              'email',
              'sms'
            ],
            radius: 50,
            spacing: 8
          }} />
        <p>Designed & developed by <a href="https://malcolmkiano.com" target="_blank" rel="noopener noreferrer">Malcolm Kiano</a>.</p>
      </footer>
    )
  }
}

export default Footer;