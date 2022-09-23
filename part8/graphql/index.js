require('dotenv').config();

const { ApolloServer, gql, UserInputError } = require('apollo-server')
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
    bookCount: async () => await Book.count({}),
    authorCount: async () => await Author.count({}),
    allBooks: async (root, args) => {
      let filtered = await Book.find({}).populate('author');
      // if (args.author) filtered = filtered.filter((b) => b.author === args.author);
      if (args.genre) filtered = filtered.filter((b) => b.genres.includes(args.genre));
      return filtered;
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const final = await Promise.all(authors.map(async (aut) => {
        const bookCount = await Book.count({ author: aut._id });
        aut.bookCount = bookCount;
        return aut;
      }));
      return final;
      /*
      // Por unica vez, agrego con este query los array a la DB:
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
      let author = await Author.findOne({ name: args.author });
      try {
        if (!author) {
          const newAuthor = new Author({ name: args.author });
          author = await newAuthor.save();
        }
        const newBook = new Book({ ...args, author: author.id });
        const result = await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      return { ...args, author };
    },
    editAuthor: async (root, args) => {
      const editedAuthor = await Author.findOneAndUpdate({ name: args.name}, { born: args.setBornTo } );
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