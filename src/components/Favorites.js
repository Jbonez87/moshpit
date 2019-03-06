import React, { Component } from 'react';
import {
  connect
} from 'react-redux';
import {
  Link
} from 'react-router-dom';

import PlaceHolder from '../static/images/placeholder.jpg';

class Favorites extends Component {
  handleImageError = e => {
    e.target.src = PlaceHolder;
  }
  render() {
    const {
      favorites,
      isLoading,
      error
    } = this.props;
    const hasError = error ? (<p>{error}</p>) : (<p>No favorites yet</p>);
    const favoriteVals = Object.values(favorites);
    const favoritesList = favoriteVals.length ? favoriteVals.map(({id, name, images}) => (
      <div
        key={id}
        className="concert-wrapper"
      >
        <div
          className="concert-item"
        >
          <h2>{name}</h2>
        </div>
        <Link
          to={`/concerts/${id}`}
        >
          <img
            className="event-image"
            onError={this.handleImageError}
            src={images[0].url} 
            alt={`${name} Poster`} 
          />
        </Link>
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