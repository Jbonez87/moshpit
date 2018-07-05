import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class App extends Component {
  state = {
    shows: {}
  }
  searchByZip(e) {
    e.preventDefault();
    const value = e.target.value;
    fetch(`/shows/${value}`)
    .then(res => res.json())
    .then(shows => {
      return this.setState(() => ({shows}))
    })
    .then(() => console.log(this.state.shows));
  }
  componentDidMount() {
    fetch('/shows/10010')
    .then(res => res.json())
    .then(json => this.setState(() => ({shows: json})))
    .then(() => console.log(this.state.shows))
  }
  render() {
    return (
      <div>
        Test
      </div>
    )
  }
}
