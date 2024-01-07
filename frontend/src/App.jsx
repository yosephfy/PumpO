import { useState } from "react";
import Layout from "./layout/Layout";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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
