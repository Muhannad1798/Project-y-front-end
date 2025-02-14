import { Link } from 'react-router-dom'
import './OtherProfile.css'
import MyPosts from '../profile/myPosts/MyPosts'
import { useEffect, useState } from 'react'
import {
  getUserFollowers,
  getUserFollowing,
  getUserProfile,
  followUser, // Assuming you have a follow API
  unfollowUser // Assuming you have an unfollow API
} from '../../services/userService'

const OtherProfile = ({ user, myPosts, otherUserId }) => {
  const [following, setFollowing] = useState(0)
  const [followers, setFollowers] = useState(0)
  const [otherUser, setOtherUser] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)

  // Fetch following list
  const getOtherUserFw = async () => {
    try {
      const FollowingData = await getUserFollowing(otherUserId)
      setFollowing(FollowingData.following)
      setIsFollowing(FollowingData.following.some((f) => f._id === user._id)) // Check if current user is following
    } catch (error) {
      setFollowing(0)
      console.log(error)
    }
  }

  // Fetch user profile
  const getOtherUserProfile = async () => {
    try {
      const OtherUserData = await getUserProfile(otherUserId)
      setOtherUser(OtherUserData)
    } catch (error) {
      setOtherUser(null)
      console.log(error)
    }
  }

  // Fetch followers
  const getOtherUserFr = async () => {
    try {
      const FollowersData = await getUserFollowers(otherUserId)
      setFollowers(FollowersData.followers)
    } catch (error) {
      setFollowers(0)
      console.log(error)
    }
  }

  // Follow a user
  const handleFollow = async () => {
    try {
      await followUser(otherUserId)
      setIsFollowing(true)
      setFollowers((prev) => prev + 1) // Increment followers count
    } catch (error) {
      console.log('Error following user:', error)
    }
  }

  // Unfollow a user
  const handleUnfollow = async () => {
    try {
      await unfollowUser(otherUserId)
      setIsFollowing(false)
      setFollowers((prev) => prev - 1) // Decrement followers count
    } catch (error) {
      console.log('Error unfollowing user:', error)
    }
  }

  useEffect(() => {
    getOtherUserProfile()
    getOtherUserFr()
    getOtherUserFw()
  }, [])

  return (
    <div className="profile-container">
      <div className="profile-header-links">
        <Link to="/settings" className="profile-footer__link">
          Edit Profile
        </Link>
        <Link to="/dashboard" className="profile-footer__link">
          Back to Home
        </Link>
      </div>

      <header className="profile-header">
        <div className="profile-header__info">
          <img
            src={
              otherUser ? otherUser.avatar : 'https://via.placeholder.com/150'
            }
            alt="User Avatar"
            className="profile-avatar"
          />
          <div className="profile-header__details">
            {otherUser ? (
              <>
                <h2>{otherUser.name}</h2>
                <p>@{otherUser.username}</p>
                <p>Bio: {otherUser.bio}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </header>

      <section className="profile-stats">
        <div className="profile-stats__item">
          <h3>Following</h3>
          <p>{following}</p>
        </div>
        <div className="profile-stats__item">
          <h3>Followers</h3>
          <p>{followers}</p>
        </div>
      </section>

      <section className="profile-action">
        {isFollowing ? (
          <button className="unfollow-btn" onClick={handleUnfollow}>
            Unfollow
          </button>
        ) : (
          <button className="follow-btn" onClick={handleFollow}>
            Follow
          </button>
        )}
      </section>

      <section className="profile-posts">
        <h3>Posts</h3>
        <MyPosts user={user} myPosts={myPosts} />
      </section>
    </div>
  )
}

export default OtherProfile
