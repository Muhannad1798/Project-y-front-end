import React from 'react'
import { Link } from 'react-router-dom'
import './Conversation.css'
const Conversation = () => {
  return (
    <div className="conversation-item">
      <Link to={`/conversations/123`}>
        <div className="conversation-header">
          <h3>Other User's Username</h3>
          <p>Last message preview...</p>
        </div>
      </Link>
    </div>
  )
}

export default Conversation
