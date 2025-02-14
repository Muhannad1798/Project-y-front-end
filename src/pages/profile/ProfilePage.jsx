import { Link } from 'react-router-dom'
import './ProfilePage.css'
import MyPosts from './myPosts/MyPosts'
import { useEffect, useState } from 'react'
import { getUserFollowers, getUserFollowing } from '../../services/userService'

const ProfilePage = ({ user, myPosts }) => {
  const [following, setFollowing] = useState(0)
  const [followers, setFollowers] = useState(0)

  const getUserFw = async () => {
    try {
      const FollowingData = await getUserFollowing()
      setFollowing(FollowingData.following)
    } catch (error) {
      setFollowing(0)
      console.log(error)
    }
  }

  const getUserFr = async () => {
    try {
      const FollowersData = await getUserFollowers()
      setFollowers(FollowersData.followers)
    } catch (error) {
      setFollowers(0)
      console.log(error)
    }
  }

  useEffect(() => {
    getUserFr()
    getUserFw()
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
            <h2>{user.name}</h2>
            <p>@{user.username}</p>
            <p>Bio: {user.bio}</p>
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

export default ProfilePage
