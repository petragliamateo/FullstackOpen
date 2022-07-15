/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';

function Login({ handleSubmit }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input name="username" />
        </div>
        <div>
          password
          <input name="password" />
        </div>
        <button id="loginButton" type="submit">login</button>
      </form>
    </div>
  );
}

export default Login;

Login.propTypes = {
  handleSubmit: propTypes.func.isRequired,
};
