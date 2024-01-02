import { useState } from "react";
import Layout from "./layout/Layout";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </>
  );
}

export default App;
