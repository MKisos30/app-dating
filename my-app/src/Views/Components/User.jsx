import axios from 'axios'
import React from 'react'
import {defer, useLoaderData} from 'react-router-dom'

const User = () => {
  const {user} = useLoaderData()
  console.log(user)
  return (
    <div>User</div>
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