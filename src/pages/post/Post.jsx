import './style/Post.css'
const Post = ({ Posts }) => {
  return (
    <>
      <div className="tweets">
        {Posts?.map((post) => (
          <div key={post._id} className="tweet">
            <div className="tweet__header">
              <h3>{post.userID.username}</h3>
              <p>{post.userID.name}</p>
            </div>
            <p className="tweet__content">{post.post}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Post
