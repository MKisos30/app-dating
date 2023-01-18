import axios from "axios";
import React, { Suspense, useState } from "react";
import {
  defer,
  useLoaderData,
  Await,
  Form,
  useNavigate,
} from "react-router-dom";
// import ProfileUpdateInputs from "./ProfileUpdateInputs";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useLoaderData();
  const [editInput, setEditInput] = useState(false);

  const [hobbies, setHobbies] = useState(user.hobbies);
  console.log(hobbies);

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
    });

    const { updateUser } = data;

    console.log(data);
    if (updateUser) {
      alert("User updated");
      navigate("/main-page/profile");
    }
  };

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={user}>
        <Form
          // action="/main-page/profile" method="post"
          onSubmit={handleUpdateProfile}
          className="formPfofile"
        >
          {/* <ProfileUpdateInputs type={"text"} name={"fullName"} defaultValue={user.fullName} placeholder={"Enter your name"} editInput={editInput} setEditInput={setEditInput}/>
                <ProfileUpdateInputs type={"text"} name={"city"} defaultValue={user.city} placeholder={"Enter your city"} editInput={editInput} setEditInput={setEditInput}/> */}
          <input type="text" name="fullName" defaultValue={user.fullName} />
          <input type="text" name="city" defaultValue={user.city} />
          <input type="text" name="lookingFor" defaultValue={user.lookingFor} />
          {/* {user.hobbies.map((item, index) => {
                    return <input key={index} type="text" name="hobbies" defaultValue={item.hobbie} />
                })} */}

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
                      onClick={removeInput}
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
          <img src={user.profilePicture} alt="Profile picture" />
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

// const updateUserSend = async ({
//   fullName,
//   gender,
//   city,
//   lookingFor,
//   dateOfBirth,
//   about,
//   profilePicture,
//   hobbies,
// }) => {
//   const { data } = await axios.post("/user/updateUser", {
//     fullName,
//     gender,
//     city,
//     lookingFor,
//     dateOfBirth,
//     about,
//     profilePicture,
//     hobbies,
//   });
//   return data;
// };

// export const updateUserAction = async ({ request }) => {
//   const formData = await request.formData();

//   const updateUser = {
//     fullName: formData.get("fullName"),
//     gender: formData.get("gender"),
//     city: formData.get("city"),
//     lookingFor: formData.get("lookingFor"),
//     dateOfBirth: formData.get("dateOfBirth"),
//     about: formData.get("aboutMe"),
//     profilePicture: formData.get("profilePicture"),
//     hobbies: formData.get("hobbies"),
//   };

//   const data = await updateUserSend(updateUser);
//   const { ok, massage, error } = data;

//   // if (massage) return massage
//   // if (error) return error
// };
