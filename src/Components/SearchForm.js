import React from 'react';

import './SearchForm.css';

class SearchForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const endpoint = form.endpoint.value;
    const query = form.query.value;
    this.props.onSearch(endpoint, query);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="searchform">
        <input required maxLength="50" type="text" name="query" spellCheck="false" autoComplete="off" placeholder="Search criteria"/>
        <select name="endpoint" defaultValue="people">
          <option value="people">People</option>
          <option value="planets">Planets</option>
          <option value="films">Films</option>
          <option value="species">Species</option>
          <option value="vehicles">Vehicles</option>
          <option value="starships">Starships</option>
        </select>
        <button disabled={this.props.disabled}>Search</button>
      </form>
    )
  }
}

export default SearchForm;