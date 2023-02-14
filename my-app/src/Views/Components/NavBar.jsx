import axios from 'axios'
import React, { Suspense } from 'react'
import { Await, defer, useLoaderData, useNavigate, Link, useLocation } from 'react-router-dom'

const NavBar = () => {
    const { data } = useLoaderData()
    const navigate = useNavigate()
    const location = useLocation();
    
    const userLogOut = async () => {
      const { data } = await axios.get('/auth/logOut')
      const {logIn} = data;
      if(!logIn) {
        navigate('/')
      }
    }

    return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={data}>
        <div className="navBarDiv">
          {
            location.pathname == '/main-page' ? null : <Link to="/main-page">Home</Link>
          }
          <Link to="user/info/likes" className="likesDiv">
            <img src="/like.jpeg" alt="like icon" />
            <p>{data.numberOfLikes}</p> 
          </Link>
          <Link to="user/info/views" className="viewsDiv">
              <img src="/view.jpeg" alt="view icon" />
              <p>{data.numberOfViews}</p>
          </Link>
          <Link to="profile">My profile</Link>
          {/* <Link to="/" onClick={userLogOut}>Log Out</Link> */}
          {/* לעשות עיצוב לכפתור */}
          <button 
          onClick={userLogOut}
          >Log Out</button>
        </div>
      </Await>
    </Suspense>
  )
}

export default NavBar

const getUserLikes = async () => {
    const { data } = await axios.get('/user/userLikes')
    const {numberOfLikes, numberOfViews} = data
    return {numberOfLikes, numberOfViews};
}

export const navBarLoader = async () => {
    return defer ({
        data: await getUserLikes()
    })
}
