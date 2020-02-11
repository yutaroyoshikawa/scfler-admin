import React from "react";
import Title from "../components/Title";
import { useUsersQuery } from "../gen/graphql-client-api";

const Home: React.FC = props => {
  const usersQuery = useUsersQuery();

  return (
    <>
      <Title>hoge</Title>
      {usersQuery.loading && <p>loading...</p>}
      <ul>
        {!usersQuery.loading &&
          usersQuery.data?.users.map((user, index) => (
            <li key={index}>
              <p>{user?.email}</p>
              <p>{user?.permission}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Home;
