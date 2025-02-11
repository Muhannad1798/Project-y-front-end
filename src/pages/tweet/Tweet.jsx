import './style/Tweet.css'
const Tweet = () => {
  return (
    <>
      <div className="tweetBox">
        <textarea placeholder="What's happening?" rows="4" />
        <button>Post</button>
      </div>
    </>
  )
}

export default Tweet
