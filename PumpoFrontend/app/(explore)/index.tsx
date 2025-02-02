import ExplorePage from "@/Pages/ExplorePage/ExplorePage";
import { useGlobalSearchParams } from "expo-router";
import React from "react";

const Explore: React.FC = () => {
  const params: { queryItem: string } = useGlobalSearchParams();
  return <ExplorePage queryItem={params.queryItem} />;
};

export default Explore;
