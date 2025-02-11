import '../App.css'
import { Link } from 'react-router-dom'

const Dashboard = ({ logOut, user }) => {
  console.log({ user })

  if (!user) {
    return <p>Please sign in</p>
  }

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <div className="sidebar__top">
            <h2>Logo</h2>
          </div>
          <div className="sidebar__menu">
            <ul>
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
              <li>Profile</li>
            </ul>
          </div>
        </div>

        <div className="feed">
          <div className="feed__header">
            <h2>Home</h2>
          </div>
          <div className="tweetBox">
            <textarea placeholder="What's happening?" rows="4" />
            <button>Tweet</button>
          </div>
          <div className="tweets">
            {/* Example tweet */}
            <div className="tweet">
              <div className="tweet__header">
                <h3>User Name</h3>
                <p>@username</p>
              </div>
              <p className="tweet__content">This is an example tweet!</p>
            </div>
          </div>
        </div>

        <div className="rightSidebar">
          <h3>Trends for You</h3>
          {/* Example trending topic */}
          <div className="trend">
            <p>#TrendingTopic</p>
          </div>
        </div>
      </div>
      );
    </>
  )
}

export default Dashboard
