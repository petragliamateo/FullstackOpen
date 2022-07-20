/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ username, handleLogout }) {
  const styles = { backgroundColor: '#cccccc', display: 'flex' };

  return (
    <div style={styles}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <div>
        {`${username} logged in`}
        <button type="submit" onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
}

export default Navbar;
