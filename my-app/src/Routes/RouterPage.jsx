import React from "react";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import User, { userLoader } from "../Views/Components/User";
import AuthPage from "../AuthPage";
import EditDetails from "../Views/Components/EditDetails"; // { addDetailsAction }
import Layout from "../Views/Components/Layout";
import LogIn, { logInAction } from "../Views/Components/LogIn";
import MainPage, { mainPageLoader } from "../Views/Components/MainPage";
import Register, { regAction } from "../Views/Components/Register";
import { navBarLoader } from "../Views/Components/NavBar";
import Profile, { mainUserProfile } from "../Views/Components/Profile";
import LinkPage, { getDataLoader } from "../Views/Components/LinkPage";
import Chat from "../Views/Components/Chat";

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
        <Route path="user/info/:type" element={<LinkPage />} 
        loader={getDataLoader}
         />
        <Route path="chat/:chatid" element={<Chat />} />
        <Route path="profile" element={<Profile />} loader={mainUserProfile} />
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
