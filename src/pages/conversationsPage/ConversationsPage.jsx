import React from 'react'
import { Link } from 'react-router-dom'
import Conversation from './conversation/Conversation'
import './ConversationsPage.css'

const ConversationsPage = () => {
  return (
    <div className="conversations-container">
      <h2>Your Conversations</h2>
      <div className="conversations-list">
        <Conversation />
        <Conversation />
        <Conversation />
      </div>
    </div>
  )
}

export default ConversationsPage
