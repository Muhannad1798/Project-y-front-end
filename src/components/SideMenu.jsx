import "./style/SideMenu.css"
const SideMenu = ({ logOut }) => {
  return (
    <div>
      <div className="sidebar__top">
        <h2>Y Logo</h2>
      </div>
      <div className="sidebar__menu">
        <ul>
          <li>Profile</li>
          <li>Home</li>
          <li>Explore</li>
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
