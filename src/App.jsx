import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/Dashboard'
import { useEffect, useState } from 'react'
import { getProfile } from './services/userService'

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

  useEffect(() => {
    getUserProfile()
  }, [])

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<Dashboard user={user} logOut={logOut} />}
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
