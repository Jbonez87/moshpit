import React, { Component } from 'react';

class Home extends Component {
  state = {
    query: ''
  }
  handleChange = e => {
    e.persist();
    this.setState(() => ({
      [e.target.id]: e.target.value
    }));
  }
  handleSubmit = e => {
    e.preventDefault();
    const {
      query
    } = this.state;
    this.props.fetchConcerts(query);
  }
  render() {
    const {
      query,
      options,
      type
    } = this.state;
    return (
      <div>
        <div
          className="form-wrapper"
        >
          <form
            onSubmit={this.handleSubmit}
          >
          <input 
            id="query"
            type="text"
            value={query}
            placeholder="Search by zip code or by city"
            onChange={this.handleChange}
          />
          <input 
            type="submit"
            value="Go"
          />
          </form>
        </div>
      </div>
    );
  }
}

export default Home;