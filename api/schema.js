const graphql = require('graphql');
// const uuid = require('uuid/v4');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

// dummy data
const events = [
  {
    id: '1',
    name: 'Epicenter Festival',
    genre: 'Rock',
    saleDate: '2019-04-12T14:00:00Z',
    info: 'TBA',
    venueId: '1',
  },
  {
    id: '2',
    name: 'Colorado Rockies vs. Los Angeles Dodgers',
    genre: 'Sports',
    saleDate: '2019-01-23T17:00:00Z',
    info: 'TBA',
    venueId: '2',
  },
  {
    id: '3',
    name: 'Disney On Ice presents Dare To Dream',
    genre: 'Play',
    saleDate: '2018-10-30T14:00:00Z',
    info: 'TBA',
    venueId: '3',
  },
];

const venues = [
  {
    id: '1',
    name: 'Rockingham Dragway',
    location: 'venue',
    zipCode: 28379,
    timezone: 'America/New_York',
  },
  {
    id: '2',
    name: 'Coors Field',
    location: 'venue',
    zipCode: 80205,
    timezone: 'America/Denver',
  },
  {
    id: '3',
    name: 'Columbus Civic Center',
    location: 'venue',
    zipCode: 31901,
    timezone: 'America/New_York',
  },
];

const EventType = new GraphQLObjectType({
  name: 'Events',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    saleDate: { type: GraphQLString },
    info: { type: GraphQLString },
    venue: {
      // eslint-disable-next-line no-use-before-define
      type: VenueType,
      // eslint-disable-next-line no-unused-vars
      resolve(parent, args) {
        return venues.find(venue => venue.id === parent.venueId);
      },
    },
  }),
});

const VenueType = new GraphQLObjectType({
  name: 'Venues',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    zipCode: { type: GraphQLInt },
    timezone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    event: {
      type: EventType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return events.find(event => event.id === args.id);
      },
    },
    venue: {
      type: VenueType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return venues.find(venue => venue.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
