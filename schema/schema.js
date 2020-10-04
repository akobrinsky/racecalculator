/* eslint-disable no-use-before-define */
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');

const {
  mutationWithClientMutationId,
  globalIdField,
  fromGlobalId,
  nodeDefinitions,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} = require('graphql-relay');

const db = require('./database');

const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'User') return db.getUser(id);
    if (type === 'Race') return db.getRace(id);
    return null;
  },
  (obj) => {
    if (obj.email) {
      return UserType;
    }
    if (obj.time) {
      return RaceType;
    }
    return null;
  },
);

const RaceType = new GraphQLObjectType({
  name: 'Race',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField('Race'),
    date: { type: GraphQLString, description: 'Date of the race' },
    type: { type: GraphQLString, description: 'Type of race' },
    time: { type: GraphQLString, description: 'Finish time of the race' },
    user: {
      type: UserType,
      resolve: (source) => db.getUser(source.userId),
    },
  }),
});

const { connectionType: raceConnection } = connectionDefinitions({
  nodeType: RaceType,
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user who loves to run',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    username: { type: GraphQLString, description: 'The name of the user' },
    email: { type: GraphQLString },
    races: {
      type: raceConnection,
      description: 'The races for a specific user',
      args: connectionArgs,
      resolve: async (user, args) => {
        const userRaces = await db.getRaces(user.id);
        return connectionFromArray([...userRaces], args);
      },
    },
  }),
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => {
        const { id } = fromGlobalId(args.id);
        return db.getUser(id);
      },
    },
    race: {
      type: RaceType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => {
        const { id } = fromGlobalId(args.id);
        return db.getRace(id);
      },
    },
    viewer: {
      type: UserType,
      resolve: () => db.getViewer(),
    },
    node: nodeField,
    nodes: nodesField,
  }),
});

const AddRaceMutation = mutationWithClientMutationId({
  name: 'addRace',
  inputFields: {
    type: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    time: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLInt) },
  },
  outputFields: {
    race: {
      type: RaceType,
      resolve: (payload) => db.getRace(payload.raceId),
    },
    user: {
      type: UserType,
      resolve: (payload) => db.getUser(payload.userId),
    },
  },
  mutateAndGetPayload: ({
    type, date, time, userId,
  }) => db.addRace(type, date, time, userId),
});

const DeleteRaceMutation = mutationWithClientMutationId({
  name: 'deleteRace',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(GraphQLInt) },
  },
  outputFields: {
    deletedRace: {
      type: RaceType,
      resolve: (payload) => payload.race,
    },
    user: {
      type: UserType,
      resolve: ({ userId }) => db.getUser(userId),
    },
  },
  mutateAndGetPayload: ({ id, userId }) => db.deleteRace(id, userId),
});

const EditRaceMutation = mutationWithClientMutationId({
  name: 'editRace',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    type: { type: GraphQLString },
    date: { type: GraphQLString },
    time: { type: GraphQLString },
  },
  outputFields: {
    editedRace: {
      type: RaceType,
      resolve: (payload) => payload,
    },
    user: {
      type: UserType,
      resolve: ({ userId }) => db.getUser(userId),
    },
  },
  mutateAndGetPayload: ({
    id, userId, type, date, time,
  }) => db.editRace(id, userId, type, date, time),
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addRace: AddRaceMutation,
    deleteRace: DeleteRaceMutation,
    editRace: EditRaceMutation,
  }),
});

module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
