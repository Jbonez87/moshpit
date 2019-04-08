const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const EventType = new GraphQLObjectType({
  name: 'Events',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    saleDate: { type: GraphQLString },
    info: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({

});

module.exports = EventType;
