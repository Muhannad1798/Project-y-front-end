import { Link } from 'react-router-dom'
import './OtherProfile.css'
import OtherPost from './otherPost/OtherPost'
import { useEffect, useState } from 'react'
import {
  getUserFollowers,
  getUserFollowing,
  getUserProfile,
  followUser,
  unfollowUser,
  getOtherPosts
} from '../../services/userService'

const OtherProfile = ({ user, otherUserId }) => {
  const [following, setFollowing] = useState(0)
  const [followers, setFollowers] = useState(0)
  const [otherUser, setOtherUser] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [otherPosts, setOtherPosts] = useState(null)

  const getOtherUserFw = async () => {
    try {
      const FollowingData = await getUserFollowing(otherUserId)
      setFollowing(FollowingData.following.length)
    } catch (error) {
      setFollowingCount(0)
      console.log(error)
    }
  }

  const getOtherUserPosts = async () => {
    try {
      const OtherUserPostsData = await getOtherPosts(otherUserId)
      console.log(OtherUserPostsData.posts)

      setOtherPosts(OtherUserPostsData.posts)
    } catch (error) {
      setOtherPosts(null)
      console.log(error)
    }
  }

  const getOtherUserProfile = async () => {
    try {
      const OtherUserData = await getUserProfile(otherUserId)
      setOtherUser(OtherUserData)
      setIsFollowing(OtherUserData.followers.includes(user._id))
    } catch (error) {
      setOtherUser(null)
      console.log(error)
    }
  }

  const getOtherUserFr = async () => {
    try {
      const FollowersData = await getUserFollowers(otherUserId)
      setFollowers(FollowersData.followers.length)
      setIsFollowing(FollowersData.followers.some((f) => f._id === user?._id))
    } catch (error) {
      setFollowersCount(0)
      console.log(error)
    }
  }

  const handleFollow = async () => {
    try {
      await followUser(otherUserId)
      setIsFollowing(true)
      setFollowers((prev) => prev + 1)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnfollow = async () => {
    try {
      await unfollowUser(otherUserId)
      setIsFollowing(false)
      setFollowers((prev) => prev - 1)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserFr()
    getUserFw()
    getOtherUserProfile()
    getOtherUserFr()
    getOtherUserFw()
    getOtherUserPosts()
  }, [])
  return (
    <div className="profile-container">
      <div className="profile-header-links">
        <Link to="/dashboard/home" className="profile-footer__link">
          Back to Home
        </Link>
      </div>

      <header className="profile-header">
        <div className="profile-header__info">
          <img
            src={
              otherUser ? otherUser.avatar : "https://via.placeholder.com/150"
            }
            alt="User Avatar"
            className="profile-avatar"
          />
          <div className="profile-header__details">
            <h2>
              name: {otherUser.name}
            </h2>
            <p>@</p>
            <p>Bio: </p>
          </div>
        </div>
      </header>

      <section className="profile-stats">
        <div className="profile-stats__item">
          <h3>Following</h3>
          <p>
            {followingCount}
          </p>
        </div>
        <div className="profile-stats__item">
          <h3>Followers</h3>
          <p>
            {followersCount}
          </p>
        </div>
      </section>

      <section className="profile-action">
        {isFollowing
          ? <button className="unfollow-btn" onClick={handleUnfollow}>
              Unfollow
            </button>
          : <button className="follow-btn" onClick={handleFollow}>
              Follow
            </button>}
      </section>

      <section className="profile-posts">
        <h3>Posts</h3>
        <OtherPost otherUser={otherUser} otherPosts={otherPosts} />
      </section>
    </div>
  )
}

export default OtherProfile
