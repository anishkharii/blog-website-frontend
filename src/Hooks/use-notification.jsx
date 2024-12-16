import { useCallback, useState } from "react";

import "../Components/Notifications/Notification.css";
import Notification from "../Components/Notifications/Notification";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const TriggerNotification = useCallback((notificationProps) => {
    const id = Date.now(); // Unique ID for the notification
    const newNotification = { id, ...notificationProps };

    setNotifications((prev) => [newNotification, ...prev]);

    // Auto-remove notification after the specified duration
    setTimeout(() => {
      removeNotification(id);
    }, notificationProps.duration);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const NotificationComponent = (
    <div className=" fixed bottom-5 left-1/2 transform -translate-x-1/2 w-10/12 max-w-md flex flex-col gap-2">
      {notifications.map((notif) => (
        <Notification
          key={notif.id}
          {...notif}
          onClose={() => removeNotification(notif.id)}
        />
      ))}
    </div>
  );

  return { NotificationComponent, TriggerNotification };
};

export default useNotification;
