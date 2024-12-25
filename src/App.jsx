
import { useEffect } from "react";
import AppRoutes from "./Routes/AppRoutes";
import { AuthProvider } from "./Contexts/AuthContext";
import { useNotification } from "./Contexts/NotificationContext";

function App() {
  const {TriggerNotification} = useNotification();
  useEffect(() => {
    async function startServer() {
      try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wakeUp`);
        
        const data = await res.json();
        console.log(data.msg);
      } catch(err) {
        TriggerNotification({
          type: "error",
          message: " Offline. Please check your internet connection.",
          duration: 5000,
        });
        return;

      }
    }
    startServer();
  }, []);
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
