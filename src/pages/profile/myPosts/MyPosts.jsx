import './MyPosts.css'
import { deletePost } from '../../../services/userService'

const MyPosts = ({ myPosts, setMyPosts }) => {
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this post?'
    )
    if (confirmDelete) {
      try {
        await deletePost(postId)

        setMyPosts((prevPosts) =>
          prevPosts
            .filter((post) => post._id !== postId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        )

        console.log('Post deleted successfully')
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
