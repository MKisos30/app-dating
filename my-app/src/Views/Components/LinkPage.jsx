import axios from "axios";
import React, { Suspense } from "react";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import UserCard from "./UserCard";

const LinkPage = () => {
  const { users } = useLoaderData();
  const { type } = useParams();

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={users}>
        <h1>{type === "views" ? "Views" : "Likes"}</h1>
        <div className="userList">
          {users.length > 0 ? (
            users.map((user) => <UserCard user={user} />)
          ) : (
            <div>No Information</div>
          )}
        </div>
      </Await>
    </Suspense>
  );
};

export default LinkPage;

const getData = async (type) => {
  const { data } = await axios.get(`/user/info/${type}`);
  return data;
};

export const getDataLoader = async ({ params }) => {
  const { type } = params;

  return defer({
    users: await getData(type),
  });
};
