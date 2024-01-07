import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Layout from "./layout/Layout";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <Layout />
        </QueryClientProvider>{" "}
      </LocalizationProvider>
    </>
  );
}

export default App;
