import OneUser from '../OneUser/OneUser'
import './Random.css'
import { useState, useEffect } from 'react'
import { getUsers } from '../../services/userService'
import { Link } from 'react-router-dom'

const Random = () => {
  const [allUser, setAllUser] = useState([])

  const getAllTheUsers = async () => {
    try {
      const allUsersData = await getUsers()
      setAllUser(allUsersData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllTheUsers()
  }, [])

  const getRandomUsers = (users) => {
    if (!users || users.length === 0) return []
    const shuffledUsers = [...users].sort(() => 0.5 - Math.random())
    return shuffledUsers.slice(0, 3)
  }

  const randomUsers = getRandomUsers(allUser)

  return (
    <div className="random-users-container">
      {randomUsers.map((user) => (
        <div key={user._id} className="user-card">
          <Link to={`/profile/user/${user._id}`} className="user-link">
            <OneUser user={user} />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Random
