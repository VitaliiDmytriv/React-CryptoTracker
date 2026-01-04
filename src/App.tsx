import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes";
import { AuthProvider } from "./features/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
