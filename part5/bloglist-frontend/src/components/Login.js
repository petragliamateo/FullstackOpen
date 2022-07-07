const Login = ({ handleSubmit, credentials, setCredentials }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label id="username">username</label>
          <input
            type='text'
            name='username'
            value={credentials.username}
            onChange={({target}) => setCredentials((prev) => ({...prev, username: target.value}))}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type='password'
            name='password'
            value={credentials.password}
            onChange={({target}) => setCredentials((prev) => ({...prev, password: target.value}))}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login