/* eslint-disable react/prop-types */
import React, { useState, useImperativeHandle } from 'react';
import propTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          type="submit"
          onClick={toggleVisibility}
          className="btn-primary my-5"
        >
          {props.buttonLabel}

        </button>
      </div>
      <div style={showWhenVisible} className="flex flex-col items-center">
        {props.children}
        <button
          type="submit"
          onClick={toggleVisibility}
          className="btn-primary mb-5"
        >
          cancel

        </button>
      </div>
    </div>
  );
});

export default Togglable;

Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired,
};
