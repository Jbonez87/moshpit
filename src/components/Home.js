import React, { Component } from 'react';

class Home extends Component {
  state = {
    query: '',
    options: [
      'Zip Code',
      'City'
    ]
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
      options
    } = this.state;
    return (
      <div>
        <div
          className="form-wrapper"
        >
          <form
            onSubmit={this.handleSubmit}
          >
            <select
              id="type"
              onChange={this.handleChange}
            >
              {
                options.map(option => (<option>{option}</option>))
              }
            </select>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;