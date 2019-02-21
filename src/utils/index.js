export const massageQuery = (query, key) => {
  let url;
  if (isNaN(query)) {
    url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&postalCode=${query}`;
  }
  url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&zip=${query}`;
  return url;
}