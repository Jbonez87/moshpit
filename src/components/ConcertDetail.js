import React, { Component } from 'react';
import {
  connect
} from 'react-redux';

import {
  fetchConcert,
  addingFavorites
} from '../actions';

// import loadingGif from '../static/images/heavylogointrohorizonatal_done.gif';
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
    if (this.props.favorites.hasOwnProperty(this.props.concert)) return;
    this.props.addingFavorites(this.props.concert);
  }
  handleImageError = e => {
    e.target.src = placeHolder;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.concert != this.props.concert;
  }
  render() {
    if(!this.props.concert._embedded) return <p>Loading...</p>;

    const {
      concert: {
        _embedded: {
          events
        }
      },
      error,
      isLoading
    } = this.props;
    const eventsMap = events.map(event => ({
      [event.id]: event
    }));
    const eventObj = Object.assign({}, ...eventsMap);
    const event = Object.values(eventObj).map(({id, name, images}) => (
      <div
        key={id}
      >
        <h2>{name}</h2>
        <img 
          className = "event-image"
          src={images[0].url}
          onError={this.handleError}
        />
      </div>
    ))
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
        {
          event
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
  fetchConcert(id) {
    dispatch(fetchConcert(id))
  },
  addingFavorites(concert) {
    dispatch(addingFavorites(concert))
  }
})

const mapStateToProps = (state, props) => ({
  concert: state.concertReducer.concert,
  isLoading: state.concertReducer.isLoading,
  error: state.concertReducer.error,
  favorites: state.favoritesReducer.favorites
})

export default connect(mapStateToProps, mapDispatchToProps)(ConcertDetail);