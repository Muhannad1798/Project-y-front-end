import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home-page">
      <h1>Hello, you are on the landing page for visitors.</h1>
      <h3>
        If you sign up for a new account, you will have the ability to sign in
        and see your super secret dashboard.
      </h3>
      <div className="links">
        <Link to="/auth/signin">Sign In</Link> |
        <Link to="/auth/signup">Sign Up</Link>
      </div>
    </div>
  )
}

export default Home
