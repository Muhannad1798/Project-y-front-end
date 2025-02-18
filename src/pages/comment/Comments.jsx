import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Comment.css'
import {
  getOnePost,
  getPostComments,
  createComment
} from '../../services/userService'

const Comment = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  const getPostComment = async () => {
    try {
      const getPost = await getOnePost(postId)
      setPost(getPost)
      const getComments = await getPostComments(postId)
      setComments(getComments)
    } catch (error) {
      console.error('Error fetching post or comments:', error)
    }
  }

  useEffect(() => {
    getPostComment()
  }, [postId])

  const handleCommentChange = (e) => {
    setNewComment(e.target.value)
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    const commentData = { comment: newComment }
    try {
      const addedComment = await createComment(postId, commentData)
      setComments([...comments, addedComment])
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <div className="comment-page">
      {post && (
        <div className="post">
          <h2>{post?.userID?.username}</h2>
          <p>{post?.post}</p>
        </div>
      )}

      <div className="comments-section">
        <h3>Comments</h3>
        {comments?.length > 0 ? (
          comments?.map((comment) => (
            <div key={comment?._id} className="comment">
              <div className="comment-header">
                <span className="comment-username">
                  {comment?.userID?.username}
                </span>
              </div>
              <p>{comment?.comment}</p>
              <span className="comment-time">
                {new Date(comment?.createdAt)?.toLocaleTimeString()}
              </span>
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}

        <form onSubmit={handleAddComment} className="add-comment-form">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            rows="4"
            id="comment"
          />
          <button type="submit">Post Comment</button>
        </form>
      </div>
    </div>
  )
}

export default Comment
