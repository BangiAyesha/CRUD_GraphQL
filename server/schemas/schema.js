const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
} = graphql;
const UserType = require("./TypeDefs/UserType");
const Users = require("../models/user.model");
const bcrypt = require("bcrypt");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return Users.find();
            },
        },
        getUserByID: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                const user = await Users.findById(args.id);
                return [user];
            },
        },
    },
});
const Mutation = new GraphQLObjectType({
    name: "mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                let hashpassword = bcrypt.hashSync(args.password, 10);
                args.password = hashpassword;
                const user = new Users(args);
                return user.save();
            },
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Users.findByIdAndUpdate(args.id, { $set: args });
            },
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return Users.findByIdAndDelete(args.id);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
