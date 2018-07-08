import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ShowsContainer from './ShowsContainer'
export default class App extends Component {
  state = {
    shows: {},
    query: '',
    querySent: false
  }
  handleChange = e => {
    e.persist()
    this.setState(() => { 
      return {
        [e.target.name]: e.target.value 
      }
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    let value
    if(this.state.query) {
      value = this.state.query
      return fetch(`/shows/${value}`)
        .then(res => res.json())
        .then(shows => {
          return this.setState(() => ({
            shows,
            query: '',
            querySent: true
          }))
        })
        .then(() => console.log(this.state.shows))
    }
    return
  }
  render() {
    let displayShows = (this.state.shows && this.state.shows.hasOwnProperty('_embedded')) ? (<ShowsContainer shows={this.state.shows} />) : this.state.querySent ? 'Sorry, no events are listed in your area' : ''
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
        >
          <input
            name="query"
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
            placeholder="Type your city or zip code here"
          />
        <input 
          type='submit' 
          value='Search shows' 
        />
        </form>
        <div>
          {displayShows}
        </div>
      </div>
    )
  }
}
