import './style/Post.css'
const Post = () => {
  return (
    <>
      <div className="tweets">
        {/* Example tweet */}
        <div className="tweet">
          <div className="tweet__header">
            <h3>User Name</h3>
            <p>@username</p>
          </div>
          <p className="tweet__content">This is an example post!</p>
        </div>
      </div>
    </>
  )
}

export default Post
