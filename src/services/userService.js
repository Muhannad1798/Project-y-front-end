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

export const userFollowing = async () => {
  const response = await client.get('/user/:userId/following')
  return response.data
}

export const userFollowers = async () => {
  const response = await client.get('/user/:userId/followers')
  return response.data
}

export const getUserProfile = async () => {
  const response = await client.get('/user/:userId/profile')
  return response.data
}
