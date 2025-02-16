import '../App.css'
import './post/Post'
import Post from './post/Post'
import Tweet from './tweet/Tweet'
import Search from '../pages/search/Search'

import SideMenu from '../components/SideMenu'
const Dashboard = ({
  logOut,
  user,
  Posts,
  setPosts,
  setOtherUserId,
  getPost
}) => {
  if (!user) {
    return <p>Please sign in</p>
  }

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <div className="sidebar__top">
            <SideMenu user={user} logOut={logOut} />
          </div>
        </div>
        <div className="feed">
          <div className="feed__header">
            <h2>Home</h2>
          </div>
          <Tweet
            setPosts={setPosts}
            Posts={Posts}
            user={user}
            getPost={getPost}
          />
          <Post Posts={Posts} user={user} setOtherUserId={setOtherUserId} />
        </div>

        <div className="rightSidebar">
        <Search setOtherUserId={setOtherUserId} />
          <div className="trend">
            <p>Random profile</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
