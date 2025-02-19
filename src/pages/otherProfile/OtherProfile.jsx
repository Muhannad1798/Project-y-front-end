import { Link, useNavigate, useParams } from 'react-router-dom'
import './OtherProfile.css'
import OtherPost from './otherPost/OtherPost'
import { useEffect, useState } from 'react'
import {
  getUserFollowers,
  getUserFollowing,
  getUserProfile,
  followUser,
  unfollowUser,
  getOtherPosts
} from '../../services/userService'
import { startNewDM } from '../../services/authService'

const OtherProfile = ({ user, getPost, getFollowingPost }) => {
  const { userId } = useParams()
  const [following, setFollowing] = useState(0)
  const [followers, setFollowers] = useState(0)
  const [otherUser, setOtherUser] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [otherPosts, setOtherPosts] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const getOtherUserFw = async () => {
    try {
      const FollowingData = await getUserFollowing(userId)
      setFollowing(FollowingData.following.length)
    } catch (error) {
      setFollowing(0)
      console.log(error)
    }
  }

  const getOtherUserPosts = async () => {
    try {
      const OtherUserPostsData = await getOtherPosts(userId)
      setOtherPosts(OtherUserPostsData.posts)
    } catch (error) {
      setOtherPosts(null)
      console.log(error)
    }
  }

  const myUser = () => {
    if (userId === user?._id) {
      navigate(`/${user?._id}/profile`)
    }
  }

  const getOtherUserProfile = async () => {
    try {
      const OtherUserData = await getUserProfile(userId)
      setOtherUser(OtherUserData)
    } catch (error) {
      setOtherUser(null)
      console.log(error)
    }
  }

  const getOtherUserFr = async () => {
    try {
      const FollowersData = await getUserFollowers(userId)
      setFollowers(FollowersData?.followers?.length)
      setIsFollowing(
        FollowersData?.followers?.some((f) => f?._id === user?._id)
      )
    } catch (error) {
      setFollowers(0)
      console.log(error)
    }
  }

  const handleFollow = async () => {
    try {
      await followUser(userId)
      setIsFollowing(true)
      setFollowers((prev) => prev + 1)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnfollow = async () => {
    try {
      await unfollowUser(userId)
      setIsFollowing(false)
      setFollowers((prev) => prev - 1)
    } catch (error) {
      console.log(error)
    }
  }

  const onClick = () => {
    getPost()
    getFollowingPost()
  }

  const startDM = async () => {
    try {
      const convData = await startNewDM(userId)
      const convId = convData.conversation_id || convData.newConvo._id
      console.log('conv')
      console.log(convId)

      const dmId = convId[0]._id

      navigate(`/conversations/${dmId}`)
    } catch (error) {
      console.log('Error starting DM:', error)
    }
  }

  useEffect(() => {
    setLoading(true)
    myUser()
    getOtherUserProfile()
    getOtherUserFr()
    getOtherUserFw()
    getOtherUserPosts()
    handleFollow()
  }, [userId])

  useEffect(() => {
    if (otherUser && following >= 0 && followers >= 0 && otherPosts) {
      setLoading(false)
    }
  }, [otherUser, following, followers, otherPosts])

  return (
    <div className="profile-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="profile-header-links">
            <Link className="profile-footer__link" onClick={startDM}>
              Message
            </Link>
            <Link
              to="/dashboard/home"
              className="profile-footer__link"
              onClick={onClick}
            >
              Back to Home
            </Link>
          </div>

          <header className="profile-header">
            <div className="profile-header__info">
              <img
                src={otherUser?.pic}
                alt="Old Twitter Egg"
                className="profile-avatar"
              />
              <div className="profile-header__details">
                {otherUser ? (
                  <>
                    <h2>{otherUser.name}</h2>
                    <p>@{otherUser.username}</p>
                    <p>Bio: {otherUser.bio}</p>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
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

          <section className="profile-action">
            {isFollowing ? (
              <button className="unfollow-btn" onClick={handleUnfollow}>
                Unfollow
              </button>
            ) : (
              <button className="follow-btn" onClick={handleFollow}>
                Follow
              </button>
            )}
          </section>

          <section className="profile-posts">
            <h3>Posts</h3>
            <OtherPost otherUser={otherUser} otherPosts={otherPosts} />
          </section>
        </>
      )}
    </div>
  )
}

export default OtherProfile
