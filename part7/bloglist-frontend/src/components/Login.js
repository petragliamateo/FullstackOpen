/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';

function Login({ handleSubmit }) {
  return (
    <div className="py-16">
      <form
        onSubmit={handleSubmit}
        className="form-basic m-8"
      >
        <p className="text-xl font-bold m-5">log in to application</p>
        username
        <input className="mb-5" name="username" />
        password
        <input className="mb-5" name="password" type="password" />
        <button id="loginButton" type="submit" className="btn-primary">
          login
        </button>
      </form>
    </div>
  );
}

export default Login;

Login.propTypes = {
  handleSubmit: propTypes.func.isRequired,
};
