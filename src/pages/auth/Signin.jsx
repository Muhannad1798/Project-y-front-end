import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../../services/authService'
import './style/Signin.css'

const initialFormData = {
  username: '',
  password: ''
}
const Signin = ({ getUserProfile }) => {
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState(initialFormData)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signIn(formData)
      await getUserProfile()
      setFormData(initialFormData)
      navigate('/dashboard')
    } catch (error) {
      setMessage(error.response?.data?.error)
    }
  }

  return (
    <main>
      <div className="form-container">
        <div className="login-form">
          <h1 className="form-title">Log In</h1>
          <p className="error-message">{message}</p>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="username">Username:</label>
              <input
                className="input"
                type="text"
                autoComplete="off"
                id="username"
                value={formData.username}
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password:</label>
              <input
                className="input"
                type="password"
                autoComplete="off"
                id="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="button-section">
              <button className="login-btn" type="submit">
                Log In
              </button>
              <Link to="/">
                <button className="cancel-btn" type="button">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Signin
