import './OtherPost.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { like, dislike } from '../../../services/authService'
import { getLike } from '../../../services/userService'

const OtherPost = ({ otherPosts, otherUser, user }) => {
  const [likedPosts, setLikedPosts] = useState({})

  useEffect(() => {
    // Fetch the like status for each post when the component mounts or updates
    otherPosts.forEach((post) => {
      fetchLikeStatus(post._id)
    })
  }, [otherPosts, user]) // Re-fetch on posts or user change

  // Function to fetch if the post is liked by the user
  const fetchLikeStatus = async (postId) => {
    try {
      const usersLike = await getLike(postId)
      const isLiked = usersLike.like.likes.some((f) => f._id === user?._id)
      setLikedPosts((prevState) => ({
        ...prevState,
        [postId]: isLiked
      }))
    } catch (error) {
      console.error('Error fetching like status:', error)
    }
  }

  // Toggle the like state for the given post
  const toggleLike = async (postId) => {
    try {
      if (likedPosts[postId]) {
        // If the post is already liked, unlike it
        await dislike(postId)
        setLikedPosts((prevState) => ({
          ...prevState,
          [postId]: false // Mark it as unliked
        }))
      } else {
        // If the post is not liked, like it
        await like(postId)
        setLikedPosts((prevState) => ({
          ...prevState,
          [postId]: true // Mark it as liked
        }))
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <div className="tweets">
      {otherPosts?.map((post) => (
        <div key={post._id} className="tweet">
          <div className="tweet__header">
            <Link to={`/${post.userID._id}/OtherProfile`}>
              <h3>{otherUser.username}</h3>
            </Link>
            <p>{otherUser.name}</p>
          </div>
          <p className="tweet__content">{post.post}</p>

          <div className="like-section">
            <button
              className={`like-btn ${likedPosts[post._id] ? 'liked' : ''}`}
              onClick={() => toggleLike(post._id)}
            >
              {likedPosts[post._id] ? '❤️' : '🤍'}
            </button>
            <span className="like-count">{post.likesCount || 0} Likes</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OtherPost
