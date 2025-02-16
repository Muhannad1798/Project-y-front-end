import './style/Tweet.css'
import { useState } from 'react'
import { tweet } from '../../services/authService'
const Tweet = ({ setPosts, Posts, user, getPost }) => {
  let initialFormData = {
    post: '',
    userID: user
  }
  const [formData, setFormData] = useState(initialFormData)

  const [message, setMessage] = useState('')
  const handleSubmit = async (e) => {
    try {
      await tweet(formData)
      setPosts([...Posts, e.target.data])
      setFormData(initialFormData)
      getPost()
    } catch (error) {
      setMessage(error.response?.data?.error)
      console.log(error)
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  return (
    <>
      <div className="tweetBox">
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="What's happening?"
            rows="4"
            onChange={handleChange}
            value={formData.post}
            id="post"
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </>
  )
}

export default Tweet
