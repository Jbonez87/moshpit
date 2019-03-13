import React, { Component } from 'react';
import {
  connect
} from 'react-redux';

import {
  fetchConcert,
  addingFavorites,
  removingFavorites
} from '../actions';

import Loading from './Loading';

import placeHolder from '../static/images/placeholder.jpg';

// import '../static/css/details.scss';

class ConcertDetail extends Component {
  componentDidMount() {
    const {
      match: {
        params: {
          id
        }
      },
      fetchConcert
    } = this.props;
    fetchConcert(id);
  }
  handleFavorite = e => {
    e.preventDefault();
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;
    if (this.props.favorites.hasOwnProperty(id)) {
      console.log(id);
      this.props.removingFavorites(id);
      e.target.classList.remove('red');
    } else {
      this.props.addingFavorites(this.props.concert.events[id]);
      e.target.classList.add('red');
    }
  }
  handleImageError = e => {
    e.target.src = placeHolder;
  }
  goBack = () => this.props.history.push('/')
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.concert != this.props.concert;
  }
  render() {
    if(!this.props.concert.events) return <Loading />;

    const {
      concert,
      error,
      isLoading
    } = this.props;
    const event = Object.values(concert.events).map(({id, name, images, url}) => (
      <div
        key={id}
      >
        <h2>{name}</h2>
        <img 
          className="event-image"
          src={images[0].url}
          onError={this.handleError}
        />
        <a
          className="ticket-container"
          href={url}
          rel="noopener noreferrer"
          target="_blank"
        >
          Buy Tickets
        </a>
      </div>
    ))
    return (
      <div
        className="details-wrapper"
      >
        {
          isLoading ? (<Loading />) : ''
        }
        {
          error ? (<p>{error}</p>) : ''
        }
        {
          event
        }
        <button
          className="back-arrow"
          title="Back to search results"
          onClick={this.goBack}
        >
          <span>
            &#10140;
          </span>
        </button>
        <button
          className="favorite"
          onClick={this.handleFavorite}
          title="Add to favorites"
        >
          <span>
            &hearts;
          </span>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchConcert(id) {
    dispatch(fetchConcert(id))
  },
  addingFavorites(concert) {
    dispatch(addingFavorites(concert))
  },
  removingFavorites(concert) {
    dispatch(removingFavorites(concert))
  }
});

const mapStateToProps = (state, props) => ({
  concert: state.concertReducer.concert,
  isLoading: state.concertReducer.isLoading,
  error: state.concertReducer.error,
  favorites: state.favoritesReducer.favorites
});

export default connect(mapStateToProps, mapDispatchToProps)(ConcertDetail);