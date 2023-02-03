import axios from 'axios';
import React from 'react';
import { defer, Link, useLoaderData, useParams } from 'react-router-dom';
import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  CardActions,
  Button,
} from '@mui/material';

const User = () => {
  const { id } = useParams();

  const userLike = async (id) => {
    const { data } = await axios.post('/user/likeUser', { id });

    const { likes } = data;
    if (likes) {
      alert('User Liked');
    }
  };

  const { user } = useLoaderData();
  console.log(user);
  return (
    <div>
      <Link to="/main-page">All Users</Link>

      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Full name: {user.fullName}
          </Typography>
          <Typography variant="h6" component="div">
            Gender: {user.gender}
          </Typography>
          <Typography variant="h6" component="div">
            Living in: {user.city}
          </Typography>
          <Typography variant="h6" component="div">
            Looking for: {user.lookingFor}
          </Typography>
          <Typography variant="h6" component="div">
            Date of birth: {user.dateOfBirth}
          </Typography>
          <Typography variant="h6" component="div">
            About me: {user.about}
          </Typography>
          {user.profilePicture && (
            <CardMedia
              sx={{ height: 200 }}
              image={user.profilePicture}
              title={user.fullName}
            />
          )}
          <Typography variant="h6" component="div">
            My Hobbies:
            <List>
              {user.hobbies.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${item.hobbie}`} />
                </ListItem>
              ))}
            </List>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => userLike(id)}>
            Like
          </Button>
        </CardActions>
      </Card>
      {/* <div className="user-div">
        {/* <button onClick={() => userLike(id)}>like</button>
      </div> */}
    </div>
  );
};

export default User;

const oneUser = async (id) => {
  const { data } = await axios.post('/user/oneUser', { id });
  const { userDetails } = data;
  return userDetails;
};

export const userLoader = async ({ params }) => {
  const { id } = params;

  return defer({
    user: await oneUser(id),
  });
};
