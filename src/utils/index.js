/* eslint-disable no-underscore-dangle */
export const formatEventsResponse = (response) => {
  const eventMap = response._embedded.events.map(event => ({
    [event.id]: event,
  }));
  const eventObj = {
    results: Object.assign({}, ...eventMap),
    page: response.page,
    links: response._links,
  };
  return eventObj;
};

export const formatEventResponse = (response) => {
  const concertObj = {
    [response.id]: response,
  };
  return concertObj;
};

export const formatDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = new Date(date).toLocaleDateString('en-us', options);
  return formattedDate !== 'Monday, January 1, 1900' ? formattedDate : 'TBA';
};
