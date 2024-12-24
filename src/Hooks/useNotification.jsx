import { createContext, useContext, useCallback, useState, useEffect } from "react";
import Notification from "../Components/Notifications/Notification";
import "../Components/Notifications/Notification.css";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const TriggerNotification = useCallback(
    (notificationProps) => {
      const id = Date.now(); 
      const newNotification = { id, ...notificationProps };

      setNotifications((prev) => [newNotification, ...prev]);

      setTimeout(() => {
        removeNotification(id);
      }, notificationProps.duration || 3000); 
    },
    [removeNotification]
  );

  const NotificationComponent = (
    <div className="fixed bottom-5 z-[1000] left-1/2 transform -translate-x-1/2 w-10/12 max-w-md flex flex-col gap-2 transition-all">
      {notifications.map((notif) => (
        <Notification
          key={notif.id}
          {...notif}
          onClose={() => removeNotification(notif.id)}
        />
      ))}
    </div>
  );

  return (
    <NotificationContext.Provider value={{ TriggerNotification }}>
      {children}
      {NotificationComponent}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
