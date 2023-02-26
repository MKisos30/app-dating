import React from "react";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Box from '@mui/material/Box';


const EditDetails = () => {
  const navigate = useNavigate();

  const [hobbies, setHobbies] = useState([{ hobbie: "" }]);

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

  const handleEditDetails = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const about = e.target.elements.about.value;
    const profilePicture = e.target.elements.profilePicture.value;

    const { data } = await axios.post("/user/addDetails", {
      city,
      hobbies,
      about,
      profilePicture,
    });

    const { addDetails } = data;

    if (addDetails) {
      navigate("/main-page");
    }
  };

  return (
    <Box component="div"
    className ="boxEditDetails"
    sx={{
    p: 2, 
    border: '1px solid grey',
    width: 600
    }}>
    <Form onSubmit={handleEditDetails} className="editDetailsForm">
      <h1>Add More Details About You</h1>
      <input type="text" name="city" placeholder="Enter your city" />
      <div>
        <div className="hobbiesLine" >Hobbies:</div>
        {hobbies.map((item, i) => {
          return (
            <div key={i}>
              <input
                onChange={handleChange}
                value={item.hobbie}
                placeholder="Enter your hobbie"
                id={i}
                type="text"
              />
              {hobbies.length !== 1 && (
                <button type="button" onClick={() => removeInput(i)}>
                  X
                </button>
              )}
            </div>
          );
        })}
        <button className="hobbiesBut" onClick={addInput} type="button">
          +
        </button>
      </div>

      <input
        type="text"
        name="about"
        placeholder="Enter a few words about you"
      />
      <input
        type="url"
        name="profilePicture"
        placeholder="Enter url of your profile picture"
      />
      <button type="submit">Send</button>
    </Form>
    </Box>
  );
};

export default EditDetails;
