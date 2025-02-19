import './OneUser.css'

const OneUser = ({ user }) => {
  return (
    <div className="user-profile">
      <div className="user-info">
        <img
          src={user.pic || 'default-avatar-url'}
          alt={user.name || 'User'}
          className="user-pic"
        />
        <div className="user-details">
          <h3 className="user-name">{user.name || 'Unknown Name'}</h3>
          <p className="user-username">@{user.username || 'no-username'}</p>
        </div>
      </div>
    </div>
  )
}

export default OneUser
