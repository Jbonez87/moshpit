import React, { Component } from 'react';
import {
  connect
} from 'react-redux';
import {
  Link
} from 'react-router-dom';

import PlaceHolder from '../static/images/placeholder.jpg';

class Favorites extends Component {
  render() {
    const {
      favorites,
      isLoading,
      error
    } = this.props;
    const hasError = error ? (<p>{error}</p>) : (<p>No favorites yet</p>);
    const favoriteVals = Object.values(favorites);
    const favoritesList = favoriteVals.length ? favoriteVals.map(({id, name}) => (
      <div
        key={id}
        className="concert-wrapper"
      >
        <Link
          to={`/${id}`}
        >
          <img
            className="poster"
            src={PlaceHolder} 
            alt={`${name} Poster`} 
          />
        </Link>
        <div
          className="movie-item"
        >
        </div>
      </div>
    )) : hasError;
    return (
      <div
        className="wrapper"
      >
        {
          isLoading ? (<p>Loading...</p>) : ''
        }
        {
          favoritesList
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  favorites: state.favoritesReducer.favorites,
  isLoading: state.favoritesReducer.isLoading,
  error: state.favoritesReducer.error
})

export default connect(mapStateToProps)(Favorites);