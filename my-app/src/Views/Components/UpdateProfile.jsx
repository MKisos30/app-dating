import React from 'react'
import { Form, Link, redirect, useActionData } from 'react-router-dom'
import axios from 'axios'

const UpdateProfile = () => {
  const data = useActionData()

  return (
    <div>UpdateProfile
      <Link to="main-Page">MainPage</Link>
    </div>
  )
}

export default UpdateProfile

const updateUserSend = async ({ fullName, gender, city, lookingFor, dateOfBirth, about, profilePicture, hobbies }) => {
  const { data } = await axios.post('/user/oneUser', { fullName, gender, city, lookingFor, dateOfBirth, about, profilePicture, hobbies })
  return data;
}

export const updateAction = async ({ request }) => {
  const formData = await request.formData();

  const updateUser = {
    fullName: formData.get("fullName"),
    gender: formData.get("gender"),
    city: formData.get("city"),
    lookingFor: formData.get("lookingFor"),
    dateOfBirth: formData.get("dateOfBirth"),
    about: formData.get("about"),
    profilePicture: formData.get("profilePicture"),
    hobbies: formData.get("hobbies")
  }

  const data = await updateUserSend(updateUser)

  const { ok, massage, error } = data

  if(massage) return massage
  if(ok) return redirect("/")
  if(error) return error
}