import '../App.css'
import './post/Post'
import Tweet from './tweet/Tweet'
import FollowingPosts from './followingPost/FollowingPosts'
import SideMenu from '../components/SideMenu'
import Search from './search/Search'
import Random from './random/Random'

const Dashboard = ({
  logOut,
  user,
  Posts,
  setPosts,
  setOtherUserId,
  followingPosts,
  allUsers
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
          <Search allUsers={allUsers} />
          <div className="trend">
            <h3>People you might know</h3>
          </div>
          <Random />
        </div>
      </div>
    </>
  )
}

export default Dashboard
