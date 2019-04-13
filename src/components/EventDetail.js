import React, { Component } from 'react';
import {
  connect
} from 'react-redux';

import {
  fetchEvent,
  addingFavorites,
  removingFavorites
} from '../actions';

import {
  formatDate
} from '../utils';

import Loading from './Loading';

import placeHolder from '../static/images/placeholder.jpg';

class EventDetail extends Component {
  componentDidMount() {
    const {
      match: {
        params: {
          id
        }
      },
      fetchEvent
    } = this.props;
    fetchEvent(id);
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
      this.props.removingFavorites(id);
      e.target.classList.remove('red');
    } else {
      this.props.addingFavorites(this.props.event[id]);
      e.target.classList.add('red');
    }
  }
  handleImageError = e => {
    e.target.src = placeHolder;
  }
  goBack = () => this.props.history.push('/')
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.event != this.props.event;
  }
  render() {
    if(!this.props.event) return <Loading />;

    const {
      event,
      error,
      isLoading
    } = this.props;
    const eventItem = Object.values(event).map(({
          id,
          name,
          images,
          url,
          dates: {
            start: {
              localDate
            }
          },
          sales: {
            public: {
              startDateTime
            }
          },
          info
        }) => (
      <div
        className="event-detail-item"
        key={id}
      >
        <h2>{name}</h2>
        <img 
          className="event-image"
          src={images[0].url}
          onError={this.handleError}
        />
        <p>Show Date: {formatDate(localDate)}</p>
        <p>Sale Date: {formatDate(startDateTime)}</p>
        <p
          className="event-info"
        >
          {info ? info : 'No info available'}
        </p>
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
          eventItem
        }
        <div
          className="btn-container"
        >
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
          className="favorite-btn"
          onClick={this.handleFavorite}
          title="Add to favorites"
        >
          <span>
            &hearts;
          </span>
        </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchEvent(id) {
    dispatch(fetchEvent(id))
  },
  addingFavorites(event) {
    dispatch(addingFavorites(event))
  },
  removingFavorites(event) {
    dispatch(removingFavorites(event))
  }
});

const mapStateToProps = (state, props) => ({
  event: state.eventReducer.event,
  isLoading: state.eventReducer.isLoading,
  error: state.eventReducer.error,
  favorites: state.favoritesReducer.favorites
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
