import axios from 'axios';
import React, {Suspense} from 'react'
import { Await, defer, Link, useLoaderData } from "react-router-dom";


//2. לעשות עיצוב ללינקים (ריבוע)
//3. לעשות ניתוב לעמוד של יוזר 

const MainPage = () => {
  const {users} = useLoaderData()
  console.log(users)

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={users}  >
        <div>We get the users</div>
        <div className="userList">
          {
            users.map(user=> (
              <Link to={`user/${user._id}`}>
                <h2>{user.fullName}</h2>
                <h2>{user.city}</h2>
                <h2>{user.dateOfBirth}</h2>
                {/* 1. לעשות חישוב לגיל */}
              </Link>
            ))
          }
        </div> 
      </Await>
    </Suspense>
  )
}

export default MainPage;

const getUsersByGender = async () => {
  const {data} = await axios.get("/user/getUsersByGender")
  return data
}

export const mainPageLoader= async () => {
  return defer({
    users: await getUsersByGender()
  })
}