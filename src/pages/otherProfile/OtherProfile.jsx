import { Link } from 'react-router-dom';
import './OtherProfile.css';
import MyPosts from '../profile/myPosts/MyPosts';
import { useEffect, useState } from 'react';
import {
  getUserFollowers,
  getUserFollowing,
  getUserProfile
} from '../../services/userService';

const OtherProfile = ({ user, myPosts, otherUserId }) => {
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [otherUser, setOtherUser] = useState(null);

  const getOtherUserFw = async () => {
    try {
      const FollowingData = await getUserFollowing(otherUserId);
      console.log(FollowingData);
      setFollowing(FollowingData.following);
    } catch (error) {
      setFollowing(0);
      console.log(error);
    }
  };

  const getOtherUserProfile = async () => {
    try {
      const OtherUserData = await getUserProfile(otherUserId);
      setOtherUser(OtherUserData);
    } catch (error) {
      setOtherUser(null);
      console.log(error);
    }
  };

  const getOtherUserFr = async () => {
    try {
      const FollowersData = await getUserFollowers(otherUserId);
      console.log(FollowersData);
      setFollowers(FollowersData.followers);
    } catch (error) {
      setFollowers(0);
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

      <section className="profile-posts">
        <h3>Posts</h3>
        <MyPosts user={user} myPosts={myPosts} />
      </section>
    </div>
  );
};

export default OtherProfile;