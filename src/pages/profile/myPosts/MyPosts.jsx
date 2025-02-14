import './MyPosts.css'
const MyPosts = ({ myPosts, user }) => {
  return (
    <>
      <div className="tweets">
        {myPosts?.map((post) => (
          <div key={post._id} className="tweet">
            <div className="tweet__header">
              <h3>{user.username}</h3>
              <p>{user.name}</p>
            </div>
            <p className="tweet__content">{post.post}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default MyPosts
