import React from 'react';

import Header from './Components/Header';
import SearchForm from './Components/SearchForm';
import Loader from './Components/Loader';
import Results from './Components/Results';
import Crawl from './Components/Crawl';
import './App.css';

import api from './api';

class App extends React.Component {
  state = {
    data: [],
    count: 0,
    searched: false,
    loading: false,
    endpoint: null,
    query: null,
    page: null,
    next: null,
    prev: null,
    crawl: null,
    error: null
  }

  getData() {
    const {endpoint, query, page} = this.state;
    api.getData(endpoint, query, page)
      .then(data => {
        this.setState({
          data: data.results,
          count: data.count,
          searched: true,
          loading: false,
          next: data.next,
          previous: data.previous
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err.message
        });
      });
  }

  navigateToPage = (n=1) => {
    document.querySelector('html').scrollTop = 0;
    let page = this.state.page + n;
    this.setState({ 
      page: page,
      loading: true
    }, this.getData);
  }

  handleSearch = (endpoint, query) => {
    this.setState({
      page: 1,
      loading: true,
      endpoint: endpoint,
      query: query
    }, this.getData);
  }

  handleCrawl = crawl => {
    if (crawl) {
      this.setState({
        crawl: crawl
      },
      () => document.querySelector('.crawl-space button').focus()
      );
    }
  }

  handleClose = () => {
    this.setState({
      crawl: null
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
  
        <main>
          <SearchForm onSearch={this.handleSearch} disabled={this.state.loading}/>
          <Loader show={this.state.loading}/>

          <Results
            rel={this.state}
            show={!this.state.loading}
            onShowCrawl={this.handleCrawl}
            onNavigate={this.navigateToPage}/>

          {this.state.crawl && this.state.crawl.content && this.state.endpoint === 'films' ? (<Crawl data={this.state.crawl} onClose={this.handleClose}/>) : ''}
        </main>
      </div>
    );
  }
}

export default App;
