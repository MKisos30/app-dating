import React from 'react'
import { Form, redirect } from 'react-router-dom'
import axios from 'axios'

const EditDetails = () => {
  return (
    <Form action="/main-page/edit-details" method="post">
        <input type="text" name="city" placeholder="Enter your city" />
        <input type="date" name="dateOfBirth" placeholder="Enter your date birth" />
        <input type="text" name="hobbies" placeholder="Enter ypur hobbies" />
        <input type="text" name="about" placeholder="Enter a few words about you" />
        <button type="submit">Send</button>
    </Form>
  )
}

export default EditDetails;

const addDetailsSend = async ({ city, dateOfBirth, hobbies, about }) => {
    const { data } = await axios.post('/user/addDetails', { city, dateOfBirth, hobbies, about })
    return data;
}

// להוסיף מניפולציה על תחביבים
// אם יש שגיאה להציג אותה - register + login + editDetails
//לקבל מידע בעמוד הראשי על היוזר

export const addDetailsAction = async ({ request }) => {
    const formData = await request.formData()

    const detailsUser = {
        city: formData.get("city"),
        dateOfBirth: formData.get("dateOfBirth"),
        hobbies: formData.get("hobbies"),
        about: formData.get("about")
    }

    const data = await addDetailsSend(detailsUser)

    const {addDetails} = data
    if(addDetails) return redirect("/main-page")
}