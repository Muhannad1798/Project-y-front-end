import { Link } from "react-router-dom"
import "./ProfilePage.css"
import MyPosts from "./myPosts/MyPosts"
import { useEffect, useState } from "react"
import { getUserFollowers, getUserFollowing } from "../../services/userService"

const ProfilePage = ({ user, myPosts, getMyPost, setMyPosts }) => {
  const [following, setFollowing] = useState(0)
  const [followers, setFollowers] = useState(0)

  const getUserFw = async () => {
    try {
      const FollowingData = await getUserFollowing(user._id)

      setFollowing(FollowingData.following.length)
    } catch (error) {
      setFollowing(0)
      console.log(error)
    }
  }

  const getUserFr = async () => {
    try {
      const FollowersData = await getUserFollowers(user._id)

      setFollowers(FollowersData.followers.length)
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
        <Link to="/dashboard/home" className="profile-footer__link">
          Back to Home
        </Link>
      </div>

      <header className="profile-header">
        <div className="profile-header__info">
          <img
            src="https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg"
            alt="Old Twitter Egg"
            className="profile-avatar"
          />
          <div className="profile-header__details">
            <Link to={`/user/${user._id}`} className="profile-header__link">
              <h2>
                {user.name}
              </h2>
            </Link>
            <p>
              @{user.username}
            </p>
            <p>
              Bio: {user.bio}
            </p>
          </div>
        </div>
      </header>

      <section className="profile-stats">
        <div className="profile-stats__item">
          <h3>Following</h3>
          <p>
            {following}
          </p>
        </div>
        <div className="profile-stats__item">
          <h3>Followers</h3>
          <p>
            {followers}
          </p>
        </div>
      </section>

      <section className="profile-posts">
        <h3>Posts</h3>
        <MyPosts
          user={user}
          myPosts={myPosts}
          getMyPost={getMyPost}
          setMyPosts={setMyPosts}
        />
      </section>
    </div>
  )
}

export default ProfilePage
