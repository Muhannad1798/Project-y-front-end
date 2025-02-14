import { Link } from 'react-router-dom'
import './OtherProfile.css'
import MyPosts from '../profile/myPosts/MyPosts'
import { useEffect, useState } from 'react'
import {
  getUserFollowers,
  getUserFollowing,
  getUserProfile
} from '../../services/userService'

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
      setFollowing(0)
      console.log(error)
    }
  }
  const getOtherUserProfile = async () => {
    try {
      const OtherUserData = await getUserProfile(otherUserId)
      setOtherUser(OtherUserData)
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
      setFollowers(0)
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
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="profile-avatar"
          />
          <div className="profile-header__details">
            <h2>name: {otherUser.name}</h2>
            <p>@</p>
            <p>Bio: </p>
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

      <section className="profile-posts">
        <h3>Posts</h3>
        <MyPosts user={user} myPosts={myPosts} />
      </section>
    </div>
  )
}

export default OtherProfile
