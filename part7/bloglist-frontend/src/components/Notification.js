/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';

function Notification({ notification }) {
  const { msg, isError } = notification;
  if (!msg) {
    return null;
  }
  return (
    <div className={isError ? 'notificationError' : 'notification'}>
      {msg}
    </div>
  );
}

export default Notification;

Notification.propTypes = {
  notification: propTypes.object.isRequired,
};
