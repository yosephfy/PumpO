import { createContext, useState } from "react";

export interface Post {
  id: number;
  type: DT_PostType;
  content: any; // You can refine these types as needed.
}

export interface PostsContextProps {
  posts: Post[];
  addPost: (post: Post) => void;
  removePost: (post: Post) => void;
}

export const PostsContext = createContext<PostsContextProps>({
  posts: [],
  addPost: () => {},
  removePost: () => {},
});

const PostsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const addPost = (post: Post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  const removePost = (post: Post) => {
    setPosts(posts.filter((x) => x.id !== post.id));
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, removePost }}>
      {children}
    </PostsContext.Provider>
  );
};
export default PostsProvider;
