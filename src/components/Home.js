import React, { Component } from 'react';
import {
  connect
} from 'react-redux';

import '../static/css/concerts.css';

import loadingGif from '../static/images/heavylogointrohorizonatal_done.gif';

import {
  fetchConcertsByCity,
  fetchConcertsByZip
} from '../actions';

class Home extends Component {
  state = {
    search: ''
  }
  /**
   * Generic method to handle onChange events on
   * text inputs or select boxes
   */
  handleChange = e => {
    e.persist();
    this.setState(() => ({
      [e.target.id]: e.target.value
    }));
  }
  handleSubmit = e => {
    e.preventDefault();
    const {
      search
    } = this.state;
    
    // Uses the query to determine which search should be performed
    if(isNaN(search)) {
      this.props.fetchConcertsByCity(encodeURIComponent(search))
    } else {
      this.props.fetchConcertsByZip(encodeURIComponent(search));
    }  
  }
  render() {
    // user input
    const {
      search
    } = this.state;

    /**
     * This is the loading state and concerts object generated by concertsReducer
     * when FETCHING_CONCERTS and FETCHING_CONCERTS_RESOLVED are dispatched
     */
    const {
      isLoading,
      concerts
    } = this.props;

    /**
     * Checks for network or custom error messages from concertsReducer
     */
    const error = this.props.error ? <p className="error">{this.props.error}</p> : '';

    /**
     * This checks to make sure that the _embedded object and events array
     * are defined in the concerts object
     */
    const concertsMap = (concerts._embedded && concerts._embedded.events) ? concerts._embedded.events.map(({ id, name }) => (
      <div
        key={id}
        className="event-item"
      >
        <p>{name}</p>
      </div>
    )) : '';

    return (
      <div>
        <div
          className="form-wrapper"
        >
          <form
            onSubmit={this.handleSubmit}
          >
          <label 
              htmlFor="search"
          >
          </label>
          <input 
            id="search"
            type="text"
            value={search}
            placeholder="Search by zip code or by city"
            onChange={this.handleChange}
          />
          <input 
            type="submit"
            value="Go"
          />
          </form>
        </div>
        <div>
          {
            error
          } 
          {
            isLoading ? <img
              className="loading" 
              src={loadingGif}
              alt="Loading..."
            /> : ''
          } 
          {
            concertsMap
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  concerts: state.concertsReducer.concerts,
  isLoading: state.concertsReducer.isLoading,
  error: state.concertsReducer.error
});

const mapDispatchToProps = dispatch => ({
  fetchConcertsByZip(query) {
    dispatch(fetchConcertsByZip(query));
  },
  fetchConcertsByCity(query) {
    dispatch(fetchConcertsByCity(query))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);