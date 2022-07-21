/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';

function Notification({ notification }) {
  const { msg, isError } = notification;
  const styles = {
    color: isError ? 'red' : 'green',
    borderColor: isError ? 'red' : 'green',
  };
  if (!msg) {
    return null;
  }
  return (
    <div
      style={styles}
      className="bg-zinc-200 text-xl border-solid border-2 rounded p-5 absolute w-full text-center"
    >
      {msg}
    </div>
  );
}

export default Notification;

Notification.propTypes = {
  notification: propTypes.object.isRequired,
};
