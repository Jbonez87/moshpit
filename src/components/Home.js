import React, { Component } from 'react';
import {
  connect
} from 'react-redux';
import {
  Link
} from 'react-router-dom';

import Loading from './Loading';
import SearchForm from './SearchForm';

import '../static/css/concerts.css';
import placeHolder from '../static/images/placeholder.jpg';
import {
  formatDate
} from '../utils';
class Home extends Component {
  handleImageError = e => {
    e.target.src = placeHolder;
  }
  render() {
    /**
     * This is the loading state and concerts object generated by concertsReducer
     * when FETCHING_CONCERTS and FETCHING_CONCERTS_RESOLVED are dispatched
     */
    const {
      isLoading,
      events
    } = this.props;

    /**
     * Checks for network or custom error messages from concertsReducer
     */
    const error = this.props.error ? <p className="error">{this.props.error}</p> : '';

    /**
     * This checks to make sure that the _embedded object and events array
     * are defined in the concerts object
     */
    const eventsMap = (events.results) ? Object.values(events.results).map(({
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
        key={id}
        className="event-item"
      >
        <h2>{name}</h2>
        <Link
          to={`/events/${id}`}
        >
          <img
            className="event-image"
            src={images[0].url}
            onError={this.handleError}
          />
        </Link>
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
    )) : '';

    return (
      <div>
        <SearchForm />
        <div>
          {
            error
          } 
          {
            isLoading ? <Loading /> : ''
          } 
          {
            eventsMap
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  events: state.eventsReducer.events,
  isLoading: state.eventsReducer.isLoading,
  error: state.eventsReducer.error
});

export default connect(mapStateToProps, null)(Home);