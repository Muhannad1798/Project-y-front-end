import { useState, useEffect } from 'react'
import { editProfile } from '../../../services/userService'
import { useNavigate } from 'react-router-dom'

const EditProfile = ({ user, setUser }) => {
  const [newBio, setNewBio] = useState('')
  const [newPicture, setNewPicture] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const loadCloudinaryScript = () => {
      const script = document.createElement('script')
      script.src = 'https://upload-widget.cloudinary.com/global/all.js'
      script.async = true
      script.onload = () => console.log('Cloudinary script loaded')
      document.body.appendChild(script)
    }

    loadCloudinaryScript()

    return () => {
      const script = document.querySelector(
        'script[src="https://upload-widget.cloudinary.com/global/all.js"]'
      )
      if (script) {
        script.remove()
      }
    }
  }, [])

  const handleImageUpload = (result) => {
    if (result.event === 'success') {
      const uploadedImageUrl = result.info.secure_url
      setNewPicture(uploadedImageUrl)
    }
  }

  const handleBioChange = (e) => {
    setNewBio(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedData = {
      bio: newBio || user.bio,
      pic: newPicture || user.pic
    }
    try {
      const updatedUser = await editProfile(updatedData)
      setUser(updatedUser)
      alert('Profile updated successfully')
      navigate(`/dashboard/home`)
    } catch (error) {
      console.error(error)
      alert('Error updating profile')
    }
  }

  const handleOpenWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'djtzb7t3q',
        uploadPreset: 'profile_picture_upload',
        sources: ['local', 'url'],
        resourceType: 'image',
        theme: 'minimal'
      },
      (error, result) => {
        if (error) {
          console.error('Upload failed:', error)
        } else {
          handleImageUpload(result)
        }
      }
    )
  }

  return (
    <div className="edit-profile-page">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={user?.username} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={newBio || user.bio}
            onChange={handleBioChange}
            placeholder="Update your bio"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Profile Picture:</label>
          <button type="button" onClick={handleOpenWidget}>
            Upload Profile Picture
          </button>
          {newPicture && (
            <div>
              <h3>Uploaded Profile Picture</h3>
              <img src={newPicture} alt="Profile" width="100" />
            </div>
          )}
          {user.pic && !newPicture && (
            <div>
              <h3>Current Profile Picture</h3>
              <img src={user.pic} alt="Profile" width="100" />
            </div>
          )}
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  )
}

export default EditProfile
