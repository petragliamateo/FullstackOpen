import React from "react";
import { useLazyQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Recommended = ({ show, favoriteGenre }) => {
  const [filtered, setFiltered] = React.useState([]);
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const showBooks = (favGenre) => {
    getBooks({ variables: { genre: favGenre } })
  }
  
  React.useEffect(() => {
    console.log('rec');
    showBooks(favoriteGenre)
    if (result.data) {
      setFiltered(result.data.allBooks)
    }
  }, [result.data])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
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
    </div>
  )
}

export default Recommended;
