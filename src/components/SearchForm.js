import React, { Component } from 'react';
import {
  connect
} from 'react-redux';

import {
  fetchEventsByCity,
  fetchEventsByZip
} from '../actions';

import '../static/css/search-form.css';

class SearchForm extends Component {
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
  /**
   * This is a submit handler that checks the user input
   * and dispatches fetchConcertsByZip or fetchConcertsByCity
   */
  handleSubmit = e => {
    e.preventDefault();
    const {
      search
    } = this.state;

    // Checks if the query isNaN to determine which search should be performed
    if (isNaN(search)) {
      this.props.fetchEventsByCity(encodeURIComponent(search))
    } else {
      this.props.fetchEventsByZip(encodeURIComponent(search));
    }
  }
  render() {
    const {
      search
    } = this.state;
    return (
      <div
        className="form-wrapper"
      >
        <form
          onSubmit={this.handleSubmit}
        >
          <label
            htmlFor="search"
          >
            <input
              id="search"
              type="text"
              value={search}
              placeholder="Search by zip code or by city"
              onChange={this.handleChange}
            />
          </label>
          <input
            type="submit"
            value="Go"
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchEventsByZip(query) {
    dispatch(fetchEventsByZip(query));
  },
  fetchEventsByCity(query) {
    dispatch(fetchEventsByCity(query))
  }
})

export default connect(null, mapDispatchToProps)(SearchForm);

