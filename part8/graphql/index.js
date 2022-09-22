require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server')
const { v4 } = require('uuid');

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

console.log('connecting to', process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Books {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Books]
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String]
    ): Books
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: async () => await Author.find({}).length,
    allBooks: async (root, args) => {
      let filtered = await Book.find({}).populate('author');
      // if (args.author) filtered = filtered.filter((b) => b.author === args.author);
      // if (args.genre) filtered = filtered.filter((b) => b.genres.includes(args.genre));
      return filtered;
    },
    allAuthors: async () => {
      // const bookCount = (name) => books.filter((b) => b.author === name).length;
      // return authors.map((aut) => ({...aut, bookCount: bookCount(aut.name)}))
      return await Author.find({})
      // Por unica vez, agrego con este query los array a la DB:
      /*
      authors.forEach((aut) => {
        const newAuthor = new Author(aut);
        newAuthor.save().then((r) => {
          console.log('saved:', r);
        })
      })
      books.forEach((book) => {
        Author.findOne({ name: book.author }).then((aut) => {
          const newBook = new Book({ ...book, author: aut._id });
          newBook.save().then((r) => {
            console.log('saved:', r);
          })
        })
      })
      */
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      const newBook = new Book({ ...args, author: author.id });
      /*
      if (!authors.map((a) => a.name).includes(args.author)) {
        authors = authors.concat({ name: args.author, id: v4() });
      }
      return newBook;
      */
      const result = await newBook.save();
      console.log({ ...args, author });
      return { ...args, author }
    },
    editAuthor: (root, args) => {
      const editedAuthor = authors.find((p) => p.name === args.name);
      const index = authors.findIndex((p) => p.name === args.name);
      if (!editedAuthor) return null;
      editedAuthor.born = args.setBornTo;
      authors[index] = editedAuthor;
      return editedAuthor;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})