import React from "react";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

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

    const { data } = await axios.post("/user/addDetails", {
      city,
      hobbies,
      about,
    });

    const { addDetails } = data;

    if (addDetails) {
      navigate("/main-page");
    }
  };

  return (
    <Form
      // action="/main-page/edit-details" method="post"
      onSubmit={handleEditDetails}
    >
      <input type="text" name="city" placeholder="Enter your city" />
      <div>
        {hobbies.map((item, i) => {
          return (
            <div key={i}>
              <input
                onChange={handleChange}
                value={item.hobbie}
                id={i}
                type="text"
              />
              {hobbies.length !== 1 && (
                <button type="button" onClick={removeInput}>
                  X
                </button>
              )}
            </div>
          );
        })}
        <button onClick={addInput} type="button">
          +
        </button>
      </div>

      <input
        type="text"
        name="about"
        placeholder="Enter a few words about you"
      />
      <button type="submit">Send</button>
    </Form>
  );
};

export default EditDetails;

// const addDetailsSend = async ({ city, dateOfBirth, hobbies, about }) => {
//   // console.log(hobbies);
//   // const { data } = await axios.post("/user/addDetails", {
//   //   city,
//   //   dateOfBirth,
//   //   hobbies,
//   //   about,
//   // });
//   // return data;

// };

// להוסיף מניפולציה על תחביבים
// אם יש שגיאה להציג אותה - register + login + editDetails
//לקבל מידע בעמוד הראשי על היוזר

// export const addDetailsAction = async ({ request }) => {
//   const formData = await request.formData();

//   // console.log(request);
//   const detailsUser = {
//     city: formData.get("city"),
//     dateOfBirth: formData.get("dateOfBirth"),
//     hobbies: formData.get("hobbies"),
//     about: formData.get("about"),
//   };
//   console.log(formData);

//   const data = await addDetailsSend(detailsUser);

//   // const { addDetails } = data;
//   // if (addDetails) return redirect("/main-page");
// };
