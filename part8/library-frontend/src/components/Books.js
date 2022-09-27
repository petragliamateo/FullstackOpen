import React from "react";
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [filtered, setFiltered] = React.useState([]);
  const result = useQuery(ALL_BOOKS);
  const books = result.loading ? [] : result.data.allBooks;
  
  React.useEffect(() => {
    setFiltered(books)
  }, [books])

  if (!props.show) {
    return null
  }

  const genres = [];
  books.forEach((b) => {
    b.genres.forEach((g) => {
      if (g && !genres.includes(g)) {
        genres.push(g);
      }
    })
  });

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filtered.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre, i) => (
          <button key={i} onClick={() => {
            setFiltered(books.filter((b) => b.genres.includes(genre)));
          }}>
            {genre}
          </button>
        ))}
        <button onClick={() => setFiltered(books)}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books
