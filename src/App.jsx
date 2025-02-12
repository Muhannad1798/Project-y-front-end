import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/SideMenu'
import Home from './pages/Home'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/Dashboard'
import { useEffect, useState } from 'react'
import { getProfile, getPosts } from './services/userService'

function App() {
  const [user, setUser] = useState(null)
  const getUserProfile = async () => {
    try {
      const data = await getProfile()

      setUser(data)
      // console.log('user profile: ' + data)
    } catch (error) {
      setUser(null)
      console.log(error)
    }
  }
  const logOut = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }
  const [Posts, setPosts] = useState(null)
  const getPost = async () => {
    try {
      const postData = await getPosts()
      setPosts(postData.posts)
    } catch (error) {
      setPosts(null)
      console.log(error)
    }
  }

  useEffect(() => {
    getUserProfile()
    getPost()
  }, [])

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                user={user}
                logOut={logOut}
                Posts={Posts}
                setPosts={setPosts}
              />
            }
          />
          <Route
            path="/auth/signup"
            element={<Signup getUserProfile={getUserProfile} />}
          />
          <Route
            path="/auth/signin"
            element={<Signin getUserProfile={getUserProfile} />}
          />
        </Routes>
      </main>
    </>
  )
}

export default App
