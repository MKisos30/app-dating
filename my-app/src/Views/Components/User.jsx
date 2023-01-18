import axios from 'axios'
import React from 'react'
import {defer, Link, useLoaderData, useParams} from 'react-router-dom'

const User = () => {
  const {id} = useParams()

  const userLike = async (id) => {
    const {data} = await axios.post('/user/likeUser', {id})

    const {likes} = data
    if(likes) {
      alert("User Liked")
    }
  }

  const { user } = useLoaderData()
  console.log(user)
  return (
    <div>
      <Link to="/main-page">All Users</Link>
      <div className="user-div">
        <h3>Full name: {user.fullName}</h3>
        <h3>Gender: {user.gender}</h3>
        <h3>Living in: {user.city}</h3>
        <h3>Looking for: {user.lookingFor}</h3>
        <h3>Date of birth: {user.dateOfBirth}</h3>
        <h3>About me: {user.about}</h3>
        {
          user.profilePicture ? 
          <img src={user.profilePicture} alt="Profile Avatar"/>
          :
          null
        }
        <h3>My hobbies:
          <ul>
          {user.hobbies.map((item) => (
             <li>
               {
                 item.hobbie
               }
             </li>
          ))}
          </ul>
          
          </h3>
        <button onClick={() => userLike(id)}>like</button>
      </div>
    </div>
  )
}

export default User

const oneUser = async (id) => {
  const {data} = await axios.post('/user/oneUser', {id})
  const  {userDetails} = data
  return userDetails
}

export const userLoader = async ({params}) =>{
  const {id} = params
  
  return defer({
     user: await oneUser(id)
  })
}