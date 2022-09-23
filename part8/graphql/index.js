require('dotenv').config();
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const resolvers = require('./apollo/resolvers')
const typeDefs = require('./apollo/typeDefs')
const context = require('./apollo/context')

console.log('connecting to', process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})