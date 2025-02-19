import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Conversation from './conversation/Conversation'
import './ConversationsPage.css'
import { getUserConversation } from '../../services/userService'

const ConversationsPage = ({ dmUser, setDmUser }) => {
  const [conversations, setConversations] = useState([])

  const getConversations = async () => {
    try {
      const convos = await getUserConversation()
      setConversations(convos)
    } catch (error) {
      console.error('Error fetching conversations:', error)
    }
  }

  useEffect(() => {
    getConversations()
  }, [])

  return (
    <div>
      <div className="profile-header-links">
        <Link to="/dashboard/home" className="profile-footer__link">
          Back to Home
        </Link>
      </div>
      <div className="conversations-container">
        <h2 className="conversations-header">Your Conversations</h2>
        <div className="conversations-list">
          {conversations && conversations.length > 0 ? (
            conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
                dmUser={dmUser}
                setDmUser={setDmUser}
              />
            ))
          ) : (
            <p className="no-conversations">No conversations yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConversationsPage
