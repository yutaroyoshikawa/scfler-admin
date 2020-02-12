import React from "react";
import { usePostsQuery } from "../gen/graphql-client-api";

const Posts: React.FC = props => {
  const posts = usePostsQuery();

  return (
    <>
      {posts.loading && <p>loading...</p>}
      {!posts.loading &&
        !posts.error &&
        posts.data?.posts.map(item => <li key={item?.id}>{item?.name}</li>)}
    </>
  );
};

export default Posts;
