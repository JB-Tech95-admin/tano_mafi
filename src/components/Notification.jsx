const Notification = ({ notification }) => {
  if (!notification) return null;
  
  return (
    <div className={`fixed top-24 right-4 z-50 px-6 py-4 rounded-2xl shadow-2xl transform transition-all duration-500 ${
      notification.type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white animate-slide-in`}>
      {notification.message}
    </div>
  );
};

export default Notification;