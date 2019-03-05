export const formatResponse = response => {
  const concertMap = response._embedded.events.map(event => ({
    [event.id]: event
  }));
  const concertObj = {
    concerts: Object.assign({}, ...concertMap),
    page: response.page,
    links: response._links
  };
  return concertObj;
}