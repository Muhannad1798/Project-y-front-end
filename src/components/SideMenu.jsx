import './style/SideMenu.css'
import { Link } from 'react-router-dom'
const SideMenu = ({ user, logOut }) => {
  return (
    <div>
      <div className="sidebar__top">
        <h2>Y Logo</h2>
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
          <li>Messages</li>
          <li>Bookmarks</li>

          <li>
            <a to="/" onClick={logOut}>
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideMenu
