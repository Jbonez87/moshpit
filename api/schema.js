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
  },
  {
    id: '2',
    name: 'Colorado Rockies vs. Los Angeles Dodgers',
    genre: 'Sports',
    saleDate: '2019-01-23T17:00:00Z',
    info: 'TBA',
  },
  {
    id: '3',
    name: 'Disney On Ice presents Dare To Dream',
    genre: 'Play',
    saleDate: '2018-10-30T14:00:00Z',
    info: 'TBA',
  },
];

const venues = [
  {
    id: '1',
    name: 'Columbus Civic Center',
    type: 'venue',
    zipCode: 31901,
    timezone: 'America/New_York',
  },
  {
    id: '2',
    name: 'Rockingham Dragway',
    type: 'venue',
    zipCode: 28379,
    timezone: 'America/New_York',
  },
  {
    id: '3',
    name: 'Coors Field',
    type: 'venue',
    zipCode: 80205,
    timezone: 'America/Denver',
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
  }),
});

const VenueType = new GraphQLObjectType({
  name: 'Venues',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
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
