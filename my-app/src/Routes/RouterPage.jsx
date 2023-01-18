import React from "react";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import User, { userLoader } from "../Views/Components/User";
import AuthPage from "../AuthPage";
import EditDetails from // { addDetailsAction }
"../Views/Components/EditDetails";
import Layout from "../Views/Components/Layout";
import LogIn, { logInAction } from "../Views/Components/LogIn";
import MainPage, { mainPageLoader } from "../Views/Components/MainPage";
import Register, { regAction } from "../Views/Components/Register";
import { navBarLoader } from "../Views/Components/NavBar";
import Profile, { mainUserProfile, updateUserAction } from "../Views/Components/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AuthPage />} action={logInAction}>
        <Route index element={<LogIn />} />
        <Route path="reg" element={<Register />} action={regAction} />
      </Route>
      <Route path="/main-page" element={<Layout />} loader={navBarLoader}>
        <Route index element={<MainPage />} loader={mainPageLoader} />
        <Route path="user/:id" element={<User />} loader={userLoader} />
        <Route path="profile" element={<Profile />} loader={mainUserProfile} action={updateUserAction}/>
        <Route
          path="edit-details"
          element={<EditDetails />}
          // action={addDetailsAction}
        />
      </Route>
    </>
  )
);

const RouterPage = () => {
  return <RouterProvider router={router} />;
};

export default RouterPage;
