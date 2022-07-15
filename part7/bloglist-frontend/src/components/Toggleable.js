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
        <button type="submit" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button type="submit" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

export default Togglable;

Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired,
};
