import { Link } from 'react-router-dom'
import './Conversation.css'

const Conversation = ({ conversation }) => {
  if (!conversation) {
    return <p>Loading...</p>
  }
  console.log(conversation.conversation._id)

  return (
    <div className="conversation-item">
      <Link to={`/conversations/${conversation.conversation._id}`}>
        <div className="conversation-header">
          <h3>{conversation.otherUser.name || 'Unknown User'}</h3>
          <p className="message-preview">
            {conversation?.lastMessage || 'No messages yet'}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default Conversation
