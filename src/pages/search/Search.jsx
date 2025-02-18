import './Search.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../../services/userService'

const Search = ({ setOtherUserId }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const [allUsers, setAllUsers] = useState(null)

  const getAllTheUsers = async () => {
    try {
      const allUsersData = await getUsers()
      setAllUsers(allUsersData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllTheUsers()
  }, [])

  const handleSearch = () => {
    if (searchQuery) {
      const filteredUsers = allUsers.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filteredUsers)
    } else {
      setSearchResults(allUsers)
    }
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-box"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((user) => (
            <Link
              to={`/profile/user/${user._id}`}
              key={user._id}
              className="search-result"
              onClick={() => setOtherUserId(user._id)}
            >
              <h3>{user.username}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
