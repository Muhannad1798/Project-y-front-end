import client from './config'

export const getProfile = async () => {
  const response = await client.get('/user/profile')
  return response.data
}

export const getPosts = async () => {
  const response = await client.get('/post/post')
  return response.data
}

export const getUsers = async () => {
  const response = await client.get('/user/users')
  return response.data
}

export const getMyPosts = async () => {
  const response = await client.get('/post/myPost')
  return response.data
}
export const getUserFollowing = async (userId) => {
  try {
    const response = await client.get(`/user/${userId}/following`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const getUserFollowers = async (userId) => {
  try {
    const response = await client.get(`/user/${userId}/followers`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching user followers:', error)
    throw error
  }
}

export const getUserProfile = async () => {
  const response = await client.get('/user/:userId/profile')
  return response.data
}
