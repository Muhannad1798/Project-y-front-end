import { Link } from 'react-router-dom'
import './ProfilePage.css' // Import the profile CSS
import MyPosts from './myPosts/MyPosts'
import { useEffect, useState } from 'react'
const ProfilePage = ({ user, myPosts }) => {
  //const [follwoing, setfollowing] = useState(null)
  // const [follwoers, setfollowing] = useState(null)

  return (
    <div className="profile-container">
      {/* Links Section at the top */}
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
      {/* Following and Followers Section */}
      <section className="profile-stats">
        <div className="profile-stats__item">
          <h3>100</h3>
          <p>Following</p>
        </div>
        <div className="profile-stats__item">
          <h3>250</h3>
          <p>Followers</p>
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
