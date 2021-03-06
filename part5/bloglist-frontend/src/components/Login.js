/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';

function Login({ handleSubmit, credentials, setCredentials }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="usernameInput"
            type="text"
            name="username"
            value={credentials.username}
            onChange={
              ({ target }) => setCredentials((prev) => ({ ...prev, username: target.value }))
            }
          />
        </div>
        <div>
          password
          <input
            id="passwordInput"
            type="password"
            name="password"
            value={credentials.password}
            onChange={
              ({ target }) => setCredentials((prev) => ({ ...prev, password: target.value }))
            }
          />
        </div>
        <button id="loginButton" type="submit">login</button>
      </form>
    </div>
  );
}

export default Login;

Login.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  credentials: propTypes.object.isRequired,
  setCredentials: propTypes.func.isRequired,
};
