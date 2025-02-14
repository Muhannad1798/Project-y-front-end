import './style/Post.css';

const Post = ({ posts }) => {
  return (
    <>
      <div className="tweets">
        {posts.map((post) => (
          <div key={post.userID} className="tweet">
            <div className="tweet__header">
              <h3>{post.post}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Post;