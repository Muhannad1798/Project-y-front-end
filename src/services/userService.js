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

export const getUserProfile = async (id) => {
  const response = await client.get(`/user/${id}/profile`)
  console.log('profile')

  console.log(response.data)

  return response.data
}

export const followUser = async (userId) => {
  const response = await client.post(`/user/${userId}/follow`)
  return response.data
}

export const unfollowUser = async (userId) => {
  const response = await client.post(`/user/${userId}/unfollow`)
  return response.data
}

export const followUser = async (userId) => {
  try {
    const response = await client.post(`/user/${userId}/follow`);
    return response.data; // Adjust based on your API response
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
};

export const unfollowUser = async (userId) => {
  try {
    const response = await client.post(`/user/${userId}/unfollow`);
    return response.data; // Adjust based on your API response
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};