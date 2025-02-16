import '../App.css'
import './post/Post'
import Tweet from './tweet/Tweet'
import FollowingPosts from './followingPost/FollowingPosts'
import SideMenu from '../components/SideMenu'
const Dashboard = ({
  logOut,
  user,
  Posts,
  setPosts,
  setOtherUserId,
  followingPosts
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
          <Tweet setPosts={setPosts} Posts={Posts} user={user} />
          <FollowingPosts
            followingPosts={followingPosts}
            setOtherUserId={setOtherUserId}
          />
        </div>

        <div className="rightSidebar">
          <h3>People you might know</h3>
          <div className="trend">
            <p>Random profile</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
