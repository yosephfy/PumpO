import ExpandedPost from "@/Pages/FeedPage/ExpandedPost";
import { useGlobalSearchParams } from "expo-router";
import React from "react";

const FullPostIndex: React.FC = () => {
  const { item }: any = useGlobalSearchParams();
  const item_data: DT_Post = item ? JSON.parse(item) : null;
  return <ExpandedPost post={item_data} />;
};

export default FullPostIndex;
