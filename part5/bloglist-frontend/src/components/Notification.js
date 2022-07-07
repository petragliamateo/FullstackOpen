
const Notification = ({ notification }) => {
  const { msg, isError } = notification;
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
