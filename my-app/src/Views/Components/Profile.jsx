import axios from "axios";
import React, { Suspense, useState } from "react";
import {
  defer,
  useLoaderData,
  Await,
  Form,
  // useNavigate,
  // useLocation,
} from "react-router-dom";
// import ProfileUpdateInputs from "./ProfileUpdateInputs";

const Profile = () => {
  const { user } = useLoaderData();
 // const [editInput, setEditInput] = useState(false);

  const [hobbies, setHobbies] = useState(user.hobbies);

  const addInput = () => {
    setHobbies((s) => {
      return [...s, { hobbie: "" }];
    });
  };

  const removeInput = (index) => {
    const rows = [...hobbies];
    rows.splice(index, 1);
    setHobbies(rows);
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setHobbies((s) => {
      const newArr = s.slice();
      newArr[index].hobbie = e.target.value;
      return newArr;
    });
  };
  //input component
  //in component - useState "editinput, setEditInput" firsteble false - when we click turn to true
  //

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const about = e.target.elements.aboutMe.value;
    const profilePicture = e.target.elements.profilePicture.value;
    const fullName = e.target.elements.fullName.value;
    const lookingFor = e.target.elements.lookingFor.value;

    const { data } = await axios.post("/user/updateUser", {
      city,
      hobbies,
      about,
      profilePicture,
      fullName,
      lookingFor,
    });

    const { updateUser } = data;

    if (updateUser) {
      alert("User updated");
      window.location.reload();
    }
  };

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={user}>
        <Form onSubmit={handleUpdateProfile} className="formPfofile">
          <input type="text" name="fullName" defaultValue={user.fullName} />
          <input type="text" name="city" defaultValue={user.city} />
          <div>
            Looking for
            <select name="lookingFor">
              <option value={user.lookingFor}>{user.lookingFor}</option>
              <option value={user.lookingFor === "women" ? "men" : "women"}>
                {user.lookingFor === "women" ? "men" : "women"}
              </option>
            </select>
          </div>

          <div>
            {hobbies.map((item, i) => {
              return (
                <div key={i} className="hobbiesDivUpdate">
                  <input
                    onChange={handleChange}
                    value={item.hobbie}
                    id={i}
                    type="text"
                  />
                  {hobbies.length !== 1 && (
                    <button
                      className="hobbieButton"
                      type="button"
                      onClick={() => removeInput(i)}
                    >
                      X
                    </button>
                  )}
                </div>
              );
            })}
            <button className="hobbieButton" onClick={addInput} type="button">
              +
            </button>
          </div>

          <input type="text" name="aboutMe" defaultValue={user.about} />
          <img src={user.profilePicture} alt="User Pic Profile" />
          <input
            type="url"
            name="profilePicture"
            defaultValue={user.profilePicture}
          />
          <button className="updateButton" type="submit">
            Update
          </button>
        </Form>
      </Await>
    </Suspense>
  );
};

export default Profile;

const getUserProfile = async () => {
  const { data } = await axios.get("/user/getProfile");
  const { userProfile } = data;
  return userProfile;
};

export const mainUserProfile = async () => {
  return defer({
    user: await getUserProfile(),
  });
};
