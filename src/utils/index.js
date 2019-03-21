export const formatEventsResponse = response => {
  const concertMap = response._embedded.events.map(event => ({
    [event.id]: event
  }));
  const concertObj = {
    events: Object.assign({}, ...concertMap),
    page: response.page,
    links: response._links
  };
  return concertObj;
}

export const formatEventResponse = response => {
  // const concertMap = Object.values(response).map(event => ({
  //   [event.id]: event
  // }));
  const concertObj = {
    [response.id]: response
  }

  return concertObj;
}