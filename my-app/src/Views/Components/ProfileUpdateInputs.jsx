import React, { useState } from 'react'

const ProfileUpdateInputs = ({type, name, placeholder, defaultValue}) => {
    const [editInput, setEditInput] = useState(false)
  return (
    <div>
        <input type={type} name={name} placeholder={placeholder} defaultValue={defaultValue} disabled={!editInput ? true: false}/>
        <button onClick={()=>{setEditInput(!editInput)}}></button>
    </div>
  )
}

export default ProfileUpdateInputs