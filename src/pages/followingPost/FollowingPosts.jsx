<<<<<<< HEAD
import './FollowingPosts.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { like, dislike } from '../../services/authService';
import { getLike } from '../../services/userService';
=======
import './FollowingPosts.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { like, dislike } from '../../services/authService'
import { getLike } from '../../services/userService'
import { useNavigate } from 'react-router-dom'
>>>>>>> 19a8210f29bf73d0459afe06a06846bda5c522f4

const FollowingPosts = ({
  followingPosts,
  otherUser,
  setOtherUserId,
  user
}) => {
<<<<<<< HEAD
  const [likeStates, setLikeStates] = useState({});
=======
  const navigate = useNavigate()

  const handleComment = async (postId) => {
    navigate(`/posts/${postId}/comments`)
  }
  const [likeStates, setLikeStates] = useState({})
>>>>>>> 19a8210f29bf73d0459afe06a06846bda5c522f4

  const checkIfLiked = async (postId) => {
    try {
      const usersLike = await getLike(postId);
      const isLiked = usersLike.like.likes.some((f) => f._id === user?._id);
      setLikeStates((prevState) => ({
        ...prevState,
        [postId]: {
          liked: isLiked,
          likesCount: usersLike.like.likes.length
        }
      }));
    } catch (error) {
      console.error('Error checking if post is liked:', error);
    }
  };

  useEffect(() => {
    followingPosts?.forEach((post) => {
      checkIfLiked(post._id)
    })
  }, [followingPosts, user])

  const toggleLike = async (e) => {
    const postId = e.target.id
    try {
<<<<<<< HEAD
      const currentLikeState = likeStates[postId];

=======
      const currentLikeState = likeStates[postId]
>>>>>>> 19a8210f29bf73d0459afe06a06846bda5c522f4
      if (currentLikeState.liked) {
        await dislike(postId)
        setLikeStates((prevState) => ({
          ...prevState,
          [postId]: {
            liked: false,
            likesCount: prevState[postId].likesCount - 1
          }
        }));
      } else {
        await like(postId)
        setLikeStates((prevState) => ({
          ...prevState,
          [postId]: {
            liked: true,
            likesCount: prevState[postId].likesCount + 1
          }
        }));
      }
    } catch (error) {
      console.error('Error liking or disliking post:', error);
    }
  };

  const onClick = (e) => {
    setOtherUserId(e.target.id);
  };

  return (
    <div className="tweets">
      {followingPosts?.map((post) => (
        <div key={post?._id} className="tweet">
          <div className="tweet__header">
            <Link to={`/profile/user/${post.userID._id}`} onClick={onClick}>
              <h3 id={post?.userID?._id}>{post?.userID?.username}</h3>
            </Link>
            <p>{post?.userID?.name}</p>
          </div>
          <p className="tweet__content">{post?.post}</p>

          <div className="like-section">
            <button
<<<<<<< HEAD
              id={post._id}
              className={`like-btn ${likeStates[post._id]?.liked ? 'liked' : ''}`}
              onClick={() => toggleLike(post._id)}
=======
              id={post?._id}
              className={`like-btn ${
                likeStates[post._id]?.liked ? 'liked' : ''
              }`}
              onClick={toggleLike}
>>>>>>> 19a8210f29bf73d0459afe06a06846bda5c522f4
            >
              {likeStates[post._id]?.liked ? '❤️' : '🤍'}
            </button>
            <span className="like-count">
              {likeStates[post._id]?.likesCount || 0} Likes
            </span>
          </div>
          <button onClick={() => handleComment(post._id)}>comments</button>
        </div>
      ))}
    </div>
<<<<<<< HEAD
  );
};

export default FollowingPosts;
=======
  )
}
export default FollowingPosts
>>>>>>> 19a8210f29bf73d0459afe06a06846bda5c522f4
