import axios from "axios";
import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import UserCard from "./UserCard";

const MainPage = () => {
  const { users } = useLoaderData();

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={users}>
        <h1>Home Page</h1>
        <div className="userList">
          {users.map((user) => (
            <UserCard user={user} />
          ))}
        </div>
      </Await>
    </Suspense>
  );
};

export default MainPage;

const getUsersByGender = async () => {
  const { data } = await axios.get("/user/getUsersByGender");
  return data;
};

export const mainPageLoader = async () => {
  return defer({
    users: await getUsersByGender(),
  });
};
