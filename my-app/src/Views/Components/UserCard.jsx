import React from "react";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import GetAge from "./GetAge";

const UserCard = ({ user }) => {
  return (
    <Link to={`/main-page/user/${user._id}`} key={user._id}>
      <Card sx={{ minWidth: 250, maxWidth: 350 }}>
        <CardMedia
          sx={{ height: 200 }}
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
  );
};

export default UserCard;
