import './style/Post.css'
const Post = ({ Posts }) => {
  return (
    <div className="tweets">
      {/*Posts.map((post) => (
          <div key={post._id} className="tweet">
            <div className="tweet__header">
              <h3></h3>
              <p>{post.userID}</p>
            </div>
            <p className="tweet__content">{post.post}</p>
          </div>
        ))*/}
      return(
      {Posts.map((po) => (
        <div key={po._id} className="tweet">
          <div className="tweet__header">
            <p>{po.userID}</p>
            <p className="tweet__content">{po.post}</p>
          </div>
        </div>
      ))}
      )
    </div>
  )
}

export default Post
