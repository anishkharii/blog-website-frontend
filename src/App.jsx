import { useEffect } from "react";
import AppRoutes from "./Routes/AppRoutes";
import { AuthProvider } from "./Contexts/AuthContext";
import { useNotification } from "./Contexts/NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider, useSelector } from "react-redux";
import store from "./Redux/store";
import { useAutoLogin } from "./Hooks/useUserActions";
import { BrowserRouter, Routes } from "react-router-dom";
import { Navbar } from "./Components/AllComponents";
import authRoutes from "./Routes/authRoutes";
import authorRoutes from "./Routes/authorRoutes";
import blogRoutes from "./Routes/blogRoutes";
import generalRoutes from "./Routes/generalRoutes";
import adminRoutes from "./Routes/adminRoutes";

const AppWrapper = () => {
  const {mutate:autoLogin} = useAutoLogin();
  useEffect(()=>{
    autoLogin({id:localStorage.getItem("id"), token:localStorage.getItem("token")});
  },[])
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {authRoutes}
        {authorRoutes}
        {blogRoutes}
        {generalRoutes}
        {adminRoutes}
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  const { TriggerNotification } = useNotification();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 15,
      },
    },
  });


  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
