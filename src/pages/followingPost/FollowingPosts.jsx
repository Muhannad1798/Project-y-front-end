import './FollowingPosts.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { like, dislike } from '../../services/authService';
import { getLike } from '../../services/userService';

const FollowingPosts = ({
  followingPosts,
  otherUser,
  setOtherUserId,
  user
}) => {
  const [likeStates, setLikeStates] = useState({});

  // Function to check if a post is liked by the current user
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

  // Run when the component is mounted to check the initial state of all posts
  useEffect(() => {
    // Set the initial like states for all posts
    const postIds = followingPosts?.map((post) => post._id)
    postIds?.forEach((postId) => checkIfLiked(postId)) // Check for each post's like status
  }, [followingPosts, user])

  const toggleLike = async (postId) => {
    try {
      const currentLikeState = likeStates[postId];

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
        <div key={post._id} className="tweet">
          <div className="tweet__header">
            <Link to={`/${post.userID._id}/OtherProfile`} onClick={onClick}>
              <h3 id={post?.userID?._id}>{post?.userID?.username}</h3>
            </Link>
            <p>{otherUser?.userID?.name}</p>
          </div>
          <p className="tweet__content">{post.post}</p>

          <div className="like-section">
            <button
              id={post._id}
              className={`like-btn ${likeStates[post._id]?.liked ? 'liked' : ''}`}
              onClick={() => toggleLike(post._id)}
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
  );
};

export default FollowingPosts;