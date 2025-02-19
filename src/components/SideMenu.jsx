import './style/SideMenu.css'
import { Link } from 'react-router-dom'
const SideMenu = ({ user, logOut }) => {
  return (
    <div>
      <div className="sidebar__top">
        <img
          src="../../public/b57bb790-021f-4bcb-9767-e696bff72ffb.png"
          alt="Old Twitter Egg"
          className="profile-avatar"
        />{' '}
      </div>
      <div className="sidebar__menu">
        <ul>
          <li>
            <Link to={`/${user._id}/profile`}>Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/home">Home</Link>
          </li>
          <li>
            <Link to="/dashboard/explore">Explore</Link>
          </li>
          <li>Notifications</li>
          <Link to="/dm">
            <li>Messages</li>
          </Link>

          <li>Bookmarks</li>

          <li>
            <Link to="/auth/signin" onClick={logOut}>
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideMenu
