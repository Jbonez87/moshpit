export const formatEventsResponse = (response) => {
  // eslint-disable-next-line no-underscore-dangle
  const concertMap = response._embedded.events.map(event => ({
    [event.id]: event,
  }));
  const concertObj = {
    events: Object.assign({}, ...concertMap),
    page: response.page,
    // eslint-disable-next-line no-underscore-dangle
    links: response._links,
  };
  return concertObj;
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
  return formattedDate;
};
