import { Link } from 'react-router-dom'
import './Conversation.css'

const Conversation = ({ conversation, setDmUser }) => {
  if (!conversation) {
    return <p>Loading...</p>
  }
  const onClick = () => {
    setDmUser(conversation.otherUser)
  }
  return (
    <div className="conversation-item">
      <Link
        to={`/conversations/${conversation.conversation._id}`}
        onClick={onClick}
      >
        <div className="conversation-header">
          <div className="conversation-avatar">
            <img
              src={conversation?.otherUser?.pic}
              alt={conversation?.otherUser?.name}
              className="avatar-img"
            />
          </div>
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
