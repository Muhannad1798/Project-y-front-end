import "../search/Search.css"
import React, { useState } from "react"

// Mock user data for demonstration
const mockUsers = [
  { _id: "1", username: "john_doe" },
  { _id: "2", username: "jane_smith" },
  { _id: "3", username: "alice_jones" },
  { _id: "4", username: "bob_brown" }
]

const Search = ({ setOtherUserId }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = () => {
    if (searchQuery) {
      const results = mockUsers.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for users..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="search-box"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      {searchResults.length > 0 &&
        <div className="search-results">
          {searchResults.map(user =>
            <div
              key={user._id}
              className="search-result"
              onClick={() => setOtherUserId(user._id)}
            >
              <h3>
                {user.username}
              </h3>
            </div>
          )}
        </div>}
    </div>
  )
}

export default Search
