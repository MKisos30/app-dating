import axios from 'axios'
import React, { Suspense } from 'react'
import { Await, defer, useLoaderData } from 'react-router'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const { data: {numberOfLikes, numberOfViews} } = useLoaderData()

    console.log(numberOfLikes, numberOfViews)

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={numberOfLikes, numberOfViews}>
        <div className="likesDiv">
          <img src="/Users/miriams/Documents/GitHub/app-dating/my-app/public/like.jpeg" alt="" />
          <p>{numberOfLikes}</p> 
        </div>
        <div className="viewsDiv">
            <img src="../public/view.jpeg" alt="" />
            <p>{numberOfViews}</p>
        </div>
        <Link to="profile">My profile</Link>
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