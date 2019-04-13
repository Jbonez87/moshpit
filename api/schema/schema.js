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
    venueId: { type: GraphQLID },
    venue: {
      // eslint-disable-next-line no-use-before-define
      type: VenueType,
      resolve(parent, args) {
        return Venue.findById(parent.venueId);
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
        return Event.find({
          venueId: parent.id,
        });
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
        return Event.findById(args.id);
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
        return Venue.findById(args.id);
      },
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return Event.find({});
      },
    },
    venues: {
      type: new GraphQLList(VenueType),
      resolve(parent, args) {
        return Venue.find({});
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
      resolve(
        parent,
        {
          name,
          location,
          zipCode,
          timezone,
        },
      ) {
        const venue = new Venue({
          name,
          location,
          zipCode,
          timezone,
        });
        return venue.save();
      },
    },
    addEvent: {
      type: EventType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        saleDate: { type: GraphQLString },
        info: { type: GraphQLString },
        venueId: { type: GraphQLID },
      },
      resolve(
        parent,
        {
          name,
          genre,
          saleDate,
          info,
          venueId,
        },
      ) {
        const event = new Event({
          name,
          genre,
          saleDate,
          info,
          venueId,
        });
        return event.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
