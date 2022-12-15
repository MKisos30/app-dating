import React from 'react';
import { Form, Link, redirect } from 'react-router-dom';
import axios from 'axios';

const LogIn = () => {
  return (
    <div className="auth">
      <Form action="/" method="post" className="logIn-form">
          <input type="text" name="email" placeholder="Enter your email" />
          <input type="password" name="password" placeholder="Enter your password" />
          <button type="submit">LogIn</button>
      </Form>
      <Link to="/reg">Register</Link>
    </div>
  )
}

export default LogIn;

const logInSend = async ({ email, password }) => {
    const { data } = await axios.post('/user/logIn', { email, password })
    return data;
}

export const logInAction = async ({ request }) => {
    const formData = await request.formData();

    const logInUser = {
        email: formData.get("email"),
        password: formData.get("password")
    }

    const data = await logInSend(logInUser)
    const {ok, massage, error,firstEnter} = data

    if (massage) return massage;
    
    if (ok&&firstEnter) {
      return redirect("/main-page/edit-details")
    } else if(ok&&!firstEnter){
      return redirect("/main-page")
    }

    if (error) return error
}

