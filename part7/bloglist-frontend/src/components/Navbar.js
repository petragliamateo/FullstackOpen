/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ username, handleLogout }) {
  return (
    <div className="bg-slate-400 flex justify-between w-full">
      <div className="m-2">
        <Link className="mr-2 text-blue-800 font-bold" to="/">blogs</Link>
        <Link className="mr-2 text-blue-800 font-bold" to="/users">users</Link>
      </div>
      <div className="m-2">
        {`${username} logged in`}
        <button type="submit" onClick={handleLogout} className="ml-2 text-red-800 font-bold">
          logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
