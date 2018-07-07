import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class App extends Component {
  state = {
    shows: {},
    query: ''
  }
  // constructor() {
  //   super();
  //   this.handleChange = this.handleChange.bind(this)
  // }
  handleChange = e => {
    e.persist()
    this.setState(() => { 
      return {
        [e.target.name]: e.target.value 
      }
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    const value = this.state.query;
    fetch(`/shows/${value}`)
      .then(res => res.json())
      .then(shows => {
        return this.setState(() => ({
          shows,
          query: ''
        }))
      })
      .then(() => console.log(this.state.shows));
  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
        >
          <input
            name="query"
            value={this.state.query}
            onChange={this.handleChange}
          />
        <input 
          type='submit' 
          value='Search shows' 
        />
        </form>
      </div>
    )
  }
}
