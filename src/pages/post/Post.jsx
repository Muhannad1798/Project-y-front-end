import './style/Post.css'
import { Link } from 'react-router-dom'

const Post = ({ Posts, setOtherUserId }) => {
  const onClick = (e) => {
    setOtherUserId(e.target.id)
  }

  return (
    <>
      <div className="tweets">
        {Posts?.map((post) => (
          <div key={post._id} className="tweet">
            <div className="tweet__header">
              <Link to={`/${post.userID._id}/OtherProfile`} onClick={onClick}>
                <h3 id={post.userID._id}>{post.userID.username}</h3>
              </Link>
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
