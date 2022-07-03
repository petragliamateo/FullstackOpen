
const Notification = ({ msg, isError }) => {
  if (!msg) {
    return null;
  }
  return (
    <div className={isError ? 'notificationError' : 'notification'}>
      {msg}
    </div>
  )
}

export default Notification;
