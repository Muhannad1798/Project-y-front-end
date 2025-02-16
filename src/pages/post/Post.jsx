import './style/Post.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { like, dislike } from '../../services/authService'
import { getLike } from '../../services/userService'

const Post = ({ Posts, setOtherUserId, user }) => {
  const [likeStates, setLikeStates] = useState({})

  const checkIfLiked = async (postId) => {
    try {
      const usersLike = await getLike(postId)
      const isLiked = usersLike.like.likes.some((f) => f._id === user?._id)
      setLikeStates((prevState) => ({
        ...prevState,
        [postId]: {
          liked: isLiked,
          likesCount: usersLike.like.likes.length
        }
      }))
    } catch (error) {
      console.error('Error checking if post is liked:', error)
    }
  }

  useEffect(() => {
    Posts?.forEach((post) => {
      checkIfLiked(post._id)
    })
  }, [Posts, user])

  const toggleLike = async (e) => {
    const postId = e.target.id
    try {
      const currentLikeState = likeStates[postId]
      if (currentLikeState.liked) {
        await dislike(postId)
        setLikeStates((prevState) => ({
          ...prevState,
          [postId]: {
            liked: false,
            likesCount: prevState[postId].likesCount - 1
          }
        }))
      } else {
        await like(postId)
        setLikeStates((prevState) => ({
          ...prevState,
          [postId]: {
            liked: true,
            likesCount: prevState[postId].likesCount + 1
          }
        }))
      }
    } catch (error) {
      console.error('Error liking or disliking post:', error)
    }
  }

  const onClick = (e) => {
    setOtherUserId(e.target.id)
  }

  return (
    <div className="tweets">
      {Posts?.map((post) => (
        <div key={post?._id} className="tweet">
          <div className="tweet__header">
            <Link to={`/${post.userID._id}/OtherProfile`} onClick={onClick}>
              <h3 id={post?.userID?._id}>{post?.userID?.username}</h3>
            </Link>
            <p>{post?.userID?.name}</p>
          </div>
          <p className="tweet__content">{post?.post}</p>

          <div className="like-section">
            <button
              id={post?._id}
              className={`like-btn ${
                likeStates[post._id]?.liked ? 'liked' : ''
              }`}
              onClick={toggleLike}
            >
              {likeStates[post._id]?.liked ? '❤️' : '🤍'}
            </button>
            <span className="like-count">
              {likeStates[post._id]?.likesCount || 0} Likes
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Post
