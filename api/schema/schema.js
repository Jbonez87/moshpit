/* eslint-disable no-unused-vars */
const graphql = require('graphql');
const Event = require('../models/event.js');
const Venue = require('../models/venue.js');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummy data
// const events = [
//   {
//     id: '1',
//     name: 'Epicenter Festival',
//     genre: 'Rock',
//     saleDate: '2019-04-12T14:00:00Z',
//     info: 'TBA',
//     venueId: '1',
//   },
//   {
//     id: '2',
//     name: 'Colorado Rockies vs. Los Angeles Dodgers',
//     genre: 'Sports',
//     saleDate: '2019-01-23T17:00:00Z',
//     info: 'TBA',
//     venueId: '2',
//   },
//   {
//     id: '3',
//     name: 'Disney On Ice presents Dare To Dream',
//     genre: 'Play',
//     saleDate: '2018-10-30T14:00:00Z',
//     info: 'TBA',
//     venueId: '3',
//   },
//   {
//     id: '4',
//     name: 'Old Dominion',
//     genre: 'Rock',
//     saleDate: '2019-01-18T15:00:00Z',
//     info: 'TBA',
//     venueId: '3',
//   },
//   {
//     id: '5',
//     name: 'Billy Joel',
//     genre: 'Rock',
//     saleDate: '2019-01-18T17:00:00Z',
//     info: 'TBA',
//     venueId: '2',
//   },
//   {
//     id: '6',
//     name: 'Zac Brown Band: The Owl Tour',
//     genre: 'Rock',
//     saleDate: '2019-02-08T17:00:00Z',
//     info: 'TBA',
//     venueId: '2',
//   },
// ];

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
      resolve(parent, args) {
        // return venues.find(venue => venue.id === parent.venueId);
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
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        // return events.filter(event => event.venueId === parent.id);
      },
    },
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
        // return events.find(event => event.id === args.id);
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
        // return venues.find(venue => venue.id === args.id);
      },
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        // return events;
      },
    },
    venues: {
      type: new GraphQLList(VenueType),
      resolve(parent, args) {
        // return venues;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addVenue: {
      type: VenueType,
      args: {
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        zipCode: { type: GraphQLInt },
        timezone: { type: GraphQLString },
      },
      resolve(parent, args) {
        const {
          name,
          location,
          zipCode,
          timezone,
        } = args;
        const venue = new Venue({
          name,
          location,
          zipCode,
          timezone,
        });
        return venue.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
