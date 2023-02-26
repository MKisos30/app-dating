import React from 'react'
import { useParams } from 'react-router-dom'

const Chat = () => {
  const {chatid} = useParams()
//   console.log(chatid)

  return (
    <div>Chat</div>
  )
}

export default Chat