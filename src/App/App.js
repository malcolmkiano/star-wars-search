import React from 'react';

import Header from '../Components/Header/Header';
import SearchForm from '../Components/SearchForm/SearchForm';
import Loader from '../Components/Loader/Loader';
import Results from '../Views/Results/Results';
import Crawl from '../Views/Crawl/Crawl';
import Footer from '../Components/Footer/Footer';
import './App.css';

import api from '../Modules/api';

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
  
  /** performs API call based on values in state */
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

  /**
   * updates value of page in state then calls getData
   * @param {number} [n] number of pages to navigate (1 or -1)
   */
  navigateToPage = (n=1) => {
    document.querySelector('.App').scrollTop = 0;
    let page = this.state.page + n;
    this.setState({ 
      page: page,
      loading: true
    }, this.getData);
  }

  /**
   * updates state with values from form then calls getData
   * @param {string} endpoint the endpoint to get data from
   * @param {string} query the search query
   */
  handleSearch = (endpoint, query) => {
    this.setState({
      page: 1,
      loading: true,
      endpoint: endpoint,
      query: query
    }, this.getData);
  }

  /**
   * shows crawl component when a film title is clicked
   * @param {object} crawl the crawl object for the film
   * @param {string} crawl.title the title of the film
   * @param {string} crawl.content the crawl content for the film
   */
  handleCrawl = crawl => {
    if (crawl) {
      this.setState({
        crawl: crawl
      },
      () => document.querySelector('.crawl-space button').focus()
      );
    }
  }

  /** closes the crawl component */
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

        <Footer />
      </div>
    );
  }
}

export default App;
