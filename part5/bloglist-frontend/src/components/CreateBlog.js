import React from 'react'

const CreateBlog = ({ newBlog, setNewBlog, handleSubmit }) => {
  const fields = ['title', 'author', 'url']
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((name) => (
          <div key={name}>
            <label id={name}>{name}</label>
            <input
              type='text'
              name={name}
              value={newBlog[name]}
              onChange={({target}) => setNewBlog((prev) => ({...prev, [name]: target.value}))}
            />
          </div>
        ))}
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateBlog