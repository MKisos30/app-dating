import axios from 'axios'
import React from 'react'
import {defer, useLoaderData, useParams} from 'react-router-dom'

const User = () => {
  const {id} = useParams()

  const userLike = async (id) => {
    const {data} = await axios.post('/user/likeUser', {id}) 
  }

  const {user} = useLoaderData()
  console.log(user)
  return (
    <div>
      <h3>User</h3>
      <button onClick={() => userLike(id)}>like</button>
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