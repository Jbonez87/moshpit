import React, { Component } from 'react';
import {
  connect
} from 'react-redux';

import {
  fetchConcert,
  addingFavorites
} from '../actions';

// import '../static/css/details.scss';

class ConcertDetail extends Component {
  componentDidMount() {
    fetchConcert(id);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.concert != this.props.concert;
  }
  handleFavorite = e => {
    e.preventDefault();
    if (this.props.favorites.hasOwnProperty(this.props.concert)) return;
    this.props.addingFavorites(this.props.concert);
  }
  render() {
    return (
      <div
        className="details-wrapper"
      >
        {
          isLoading ? (<p>Loading...</p>) : ''
        }
        {
          error ? (<p>{error}</p>) : ''
        }
        <button
          onClick={this.handleFavorite}
        >
          Add to Favorites
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMovie(id) {
    dispatch(fetchMovie(id))
  },
  addingFavorites(movie) {
    dispatch(addingFavorites(movie))
  }
})

const mapStateToProps = (state, props) => ({
  concert: state.concertReducer.movie,
  isLoading: state.concertReducer.isLoading,
  error: state.concertReducer.error,
  favorites: state.favoritesReducer.favorites
})

export default connect(mapStateToProps, mapDispatchToProps)(ConcertDetail);