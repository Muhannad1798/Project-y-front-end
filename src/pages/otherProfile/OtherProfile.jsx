import { Link } from "react-router-dom"
import "./OtherProfile.css"
import MyPosts from "../profile/myPosts/MyPosts"
import { useEffect, useState } from "react"
import {
  getUserFollowers,
  getUserFollowing,
  getUserProfile
} from "../../services/userService"

const OtherProfile = ({ user, myPosts, otherUserId }) => {
  const [following, setFollowing] = useState(0)
  const [followers, setFollowers] = useState(0)
  const [otherUser, setOtherUser] = useState(null)

  const getUserFw = async () => {
    try {
      const FollowingData = await getUserFollowing(user._id)
      console.log(FollowingData)

      setFollowing(FollowingData.following)
    } catch (error) {
      setFollowingCount(0)
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
  const getUserFr = async () => {
    try {
      const FollowersData = await getUserFollowers(user._id)
      console.log(FollowersData)

      setFollowers(FollowersData.followers)
    } catch (error) {
      setFollowersCount(0)
      console.log(error)
    }
  }

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(otherUserId)
        setFollowersCount(prev => prev - 1)
      } else {
        await followUser(otherUserId)
        setFollowersCount(prev => prev + 1)
      }
      setIsFollowing(!isFollowing)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserFr()
    getUserFw()
    getOtherUserProfile()
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
        <MyPosts user={user} myPosts={myPosts} />
      </section>
    </div>
  )
}

export default OtherProfile
