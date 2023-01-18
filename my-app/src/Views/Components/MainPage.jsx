import axios from "axios";
import React, { Suspense } from "react";
import { Await, defer, Link, useLoaderData } from "react-router-dom";
import GetAge from "./GetAge";

const MainPage = () => {
  const { users } = useLoaderData();
  // console.log(users);
  // const age = useAge(user.dateOfBirth);

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={users}>
        <div>We get the users</div>
        <div className="userList">
          {users.map((user) => (
            <Link to={`user/${user._id}`} key={user._id}>
              <h2>{user.fullName}</h2>
              <h2>{user.city}</h2>
              {/* <h2>{user.dateOfBirth}</h2> */}
              <GetAge user={user} />
              {/* 1. לעשות חישוב לגיל */}
            </Link>
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
