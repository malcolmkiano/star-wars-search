import React from 'react';

import swlogo from '../../media/swlogo.svg'
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="logo">
          <img src={swlogo} alt="Star Wars"/>
          <h1>SEARCH</h1>
        </div>
        <p>
          Find people, planets, films, and more from the Star Wars Universe.
        </p>
      </header>
    );
  }
}

export default Header;