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
  GraphQLNonNull,
} = graphql;

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
        name: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        zipCode: { type: new GraphQLNonNull(GraphQLInt) },
        timezone: { type: new GraphQLNonNull(GraphQLString) },
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        saleDate: { type: new GraphQLNonNull(GraphQLString) },
        info: { type: new GraphQLNonNull(GraphQLString) },
        venueId: { type: new GraphQLNonNull(GraphQLID) },
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
