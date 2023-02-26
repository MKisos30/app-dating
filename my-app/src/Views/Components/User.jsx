import axios from 'axios';
import React, { useEffect } from 'react';
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
  Box,
} from '@mui/material';

const User = () => {
  const { id } = useParams();
  const { user } = useLoaderData();

  const userLike = async (id) => {
    const { data } = await axios.post('/user/likeUser', { id });

    const { likes } = data;
    if (likes) {
      alert('User Liked');
    }
  };

  const toDate = date => {
     return new Intl.DateTimeFormat("en-EN", {
      day: '2-digit',
      month:'2-digit',
      year:'numeric'
    })
    .format(new Date(date))
  }

  const birthDay = toDate(user.dateOfBirth)

  return (
    <div>
      <Box component="div"
      className="boxAllUsers"
      sx={{
      p: 2, 
      border: '1px solid grey',
      }}>
        <Link to="/main-page">All Users</Link>
      </Box>

      <Card sx={{ maxWidth: 500 }} className="userCard">
        <CardContent>
          <CardActions>
            <Link to="/main-page/chat/563437128">Chat</Link>
          </CardActions>
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
          <Typography variant="h6" component="div" className="dateOfBirth">
             Date of birth: {birthDay}
            
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
