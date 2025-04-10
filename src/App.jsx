
import { useNotification } from "./Contexts/NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider, useSelector } from "react-redux";
import store from "./Redux/store";
import AppRouter from "./Routes/AppRouter";



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
        <AppRouter />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
