import axios from "axios";
import React, { Suspense } from "react";
import { Await, defer, Link, useLoaderData } from "react-router-dom";
import GetAge from "./GetAge";
import {Card, CardMedia, CardContent, Typography } from '@mui/material';


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
              <Card sx={{minWidth: 250,  maxWidth:350}}>
                <CardMedia
                sx={{height: 200}}
                  image={user.profilePicture}
                  title={user.fullName}
                />
                <CardContent>
                  <Typography variant="h4" component="div">
                    {user.fullName}
                  </Typography>
                  <Typography variant="h4" component="div">
                    {user.city}
                  </Typography>
                  <Typography>
                    <GetAge user={user} />
                  </Typography>
                </CardContent>
              </Card>
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
