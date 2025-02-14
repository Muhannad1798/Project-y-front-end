import { Link } from 'react-router-dom';
import './OtherProfile.css';
import MyPosts from '../profile/myPosts/MyPosts';
import { useEffect, useState } from 'react';
import {
  getUserFollowers,
  getUserFollowing,
  getUserProfile,
  followUser,
  unfollowUser
} from '../../services/userService';

const OtherProfile = ({ user, myPosts, otherUserId }) => {
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [otherUser, setOtherUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const getOtherUserFw = async () => {
    try {
      const FollowingData = await getUserFollowing(otherUserId);
      setFollowingCount(FollowingData.following);
    } catch (error) {
      setFollowingCount(0);
      console.log(error);
    }
  };

  const getOtherUserProfile = async () => {
    try {
      const OtherUserData = await getUserProfile(otherUserId);
      setOtherUser(OtherUserData);
      setIsFollowing(OtherUserData.followers.includes(user._id));
    } catch (error) {
      setOtherUser(null);
      console.log(error);
    }
  };

  const getOtherUserFr = async () => {
    try {
      const FollowersData = await getUserFollowers(otherUserId);
      setFollowersCount(FollowersData.followers);
    } catch (error) {
      setFollowersCount(0);
      console.log(error);
    }
  };

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(otherUserId);
        setFollowersCount((prev) => prev - 1);
      } else {
        await followUser(otherUserId);
        setFollowersCount((prev) => prev + 1);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOtherUserProfile();
    getOtherUserFr();
    getOtherUserFw();
  }, []);

  return (
    <div className="profile-container">
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
            {otherUser ? (
              <>
                <h2>{otherUser.name}</h2>
                <p>@{otherUser.username}</p>
                <p>Bio: {otherUser.bio}</p>
                <button onClick={handleFollowToggle} className="follow-button">
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
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
          <p>{followingCount}</p>
        </div>
        <div className="profile-stats__item">
          <h3>Followers</h3>
          <p>{followersCount}</p>
        </div>
      </section>

      <section className="profile-posts">
        <h3>Posts</h3>
        <MyPosts user={user} myPosts={myPosts} />
      </section>
    </div>
  );
};

export default OtherProfile;