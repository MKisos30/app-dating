import React from 'react'
import { Form, redirect } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  return (
    <Form action="/reg" method="post">
        <input type="text" name="fullName" placeholder="Enter Your Full Name"/>
        <input type="email" name="email" placeholder="Enter Your Email"/>
        <input type="password" name="password" placeholder="Password"/>
        <input type="password" name="confirmPassword" placeholder="Confirm Password"/>
        <div>Looking for</div>
          <select name="lookingFor">
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        <div>Choose your gender</div>
          <select name="gender">
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        <button type="submit">Send</button>
    </Form>
  )
}

export default Register;

const regSend = async ({ fullName, email, password, confirmPassword, lookingFor, gender }) =>{
    const {data} = await axios.post('/user/register', {fullName, email, password, confirmPassword, lookingFor, gender})
    return data;
}

export const regAction = async ({ request }) => {
    const formData = await request.formData();

    const regUser = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        lookingFor: formData.get("lookingFor"),
        gender: formData.get("gender"),
    }

    const data = await regSend(regUser)
    const {ok, massage,error} = data

    if(massage) return massage
    if(ok) return redirect("/")
    if(error) return error
}