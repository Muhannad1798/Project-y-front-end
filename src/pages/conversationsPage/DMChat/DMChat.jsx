import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  getConversationMessages,
  sendMessage
} from '../../../services/authService'
import './DMChat.css'

const DMChat = ({ user, dmUser }) => {
  const { convId } = useParams()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const currentUserId = user._id

  const getMessages = async () => {
    try {
      const messages = await getConversationMessages(convId)
      setMessages(messages)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    setNewMessage(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    try {
      const messageData = { message: newMessage }
      const response = await sendMessage(convId, messageData)

      setMessages((prevMessages) => [...prevMessages, response.comment])

      setNewMessage('')
      getMessages()
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  useEffect(() => {
    getMessages()
  }, [convId])

  return (
    <div className="chat-page">
      <div className="profile-header-links">
        <Link to="/dm" className="profile-footer__link">
          Back to Home
        </Link>
      </div>
      <div className="chat-header">
        <div className="dm-user-info">
          <img
            src={dmUser?.pic}
            alt={`${dmUser?.name}'s profile`}
            className="dm-user-pic"
          />
          <h2>{dmUser?.name || 'Unknown User'}</h2>
        </div>
      </div>

      <div className="chat-container">
        <div className="messages-list">
          {messages?.length > 0 ? (
            messages.map((message) => (
              <div
                key={message._id}
                className={`message ${
                  message.sender === currentUserId ? 'sent' : 'received'
                }`}
              >
                <p>{message.message}</p>
                <span className="message-time">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
            ))
          ) : (
            <p>No messages yet</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="chat-input">
          <textarea
            placeholder="Type a message..."
            rows="4"
            value={newMessage}
            id="message"
            onChange={handleChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default DMChat
