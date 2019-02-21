import React, { Component } from 'react';

class Home extends Component {
  state = {
    query: '',
  }
  handleChange = e => {
    e.persist();
    this.setState(() => ({
      [e.target.id]: e.target.value
    }));
  }
  handleSubmit = async e => {
    e.preventDefault();
    const {
      query
    } = this.state;
    this.props.fetchMovies(title, year);
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Home;