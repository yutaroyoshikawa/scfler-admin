import React from "react";
import { useSnackbar } from "notistack";
import { useUsersQuery } from "../gen/graphql-client-api";

const Users: React.FC = () => {
  const { data, loading, error } = useUsersQuery();
  const { enqueueSnackbar } = useSnackbar();

  if (error) {
    enqueueSnackbar(error);
  }

  return (
    <>
      {loading && <p>loading</p>}
      {!loading && !error && data?.users.map(user => <div>{user?.id}</div>)}
    </>
  );
};

export default Users;
