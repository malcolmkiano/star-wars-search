import React from 'react';

import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>STAR WARS SEARCH</h1>
        <p>
          Find people, planets, films, and more from the Star Wars Universe.
        </p>
      </header>
    );
  }
}

export default Header;