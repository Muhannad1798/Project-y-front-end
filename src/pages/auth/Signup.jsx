import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../../services/authService'
import './style/Signup.css'

const initialFormData = {
  username: '',
  password: '',
  passwordConf: '',
  phoneNumber: '',
  name: '',
  email: ''
}
const Signup = ({ getUserProfile }) => {
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState(initialFormData)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signUp(formData)
      await getUserProfile()
      setFormData(initialFormData)
      navigate('/dashboard/home')
    } catch (error) {
      setMessage(error.response?.data?.error)
      console.log(error)
    }
  }

  const isFormInvalid = () => {
    return !(
      formData.username &&
      formData.password &&
      formData.password === formData.passwordConf &&
      formData.phoneNumber &&
      formData.name &&
      formData.email
    )
  }

  return (
    <main>
      <div className="form-container">
        <div className="signup-form">
          <h1 className="form-title">Sign Up</h1>
          <p className="error-message">{message}</p>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="name">Name:</label>
              <input
                className="input"
                type="text"
                id="name"
                value={formData.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="username">Username:</label>
              <input
                className="input"
                type="text"
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
                id="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="confirm">Confirm Password:</label>
              <input
                className="input"
                type="password"
                id="confirm"
                value={formData.passwordConf}
                name="passwordConf"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                className="input"
                type="number"
                id="phoneNumber"
                value={formData.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email:</label>
              <input
                className="input"
                type="text"
                id="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="button-section">
              <button
                className="signup-btn"
                type="submit"
                disabled={isFormInvalid()}
              >
                Sign Up
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

export default Signup
