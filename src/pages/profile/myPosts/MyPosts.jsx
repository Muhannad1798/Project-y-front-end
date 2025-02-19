import './MyPosts.css'
import { useNavigate } from 'react-router-dom'
import { deletePost } from '../../../services/userService'

const MyPosts = ({ myPosts, setMyPosts, user, getMyPost }) => {
  const navigate = useNavigate()

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this post?'
    )
    if (confirmDelete) {
      try {
        await deletePost(postId)
        navigate(`/${user._id}/profile`)
        getMyPost()
      } catch (error) {
        console.error('Error deleting the post:', error)
      }
    }
  }

  return (
    <div className="tweets">
      {myPosts?.map((post) => (
        <div key={post._id} className="tweet">
          <div className="tweet__header">
            <h3>{post.username}</h3>
            <p>{post.name}</p>
          </div>
          <p className="tweet__content">{post.post}</p>
          <button className="delete-btn" onClick={() => handleDelete(post._id)}>
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default MyPosts
