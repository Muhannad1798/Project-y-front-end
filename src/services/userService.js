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

export const getOtherPosts = async (id) => {
  const response = await client.get(`/post/${id}/otherPost`)
  return response.data
}

export const getFollowingPosts = async () => {
  const response = await client.get(`/post/followingPost`)
  return response.data
}

export const getUserFollowing = async (userId) => {
  try {
    const response = await client.get(`/user/${userId}/following`)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const getUserIsFollowing = async (userId) => {
  try {
    const response = await client.get(`/user/${userId}/isFollowing`)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const getUserFollowers = async (userId) => {
  try {
    const response = await client.get(`/user/${userId}/followers`)
    return response.data
  } catch (error) {
    console.error('Error fetching user followers:', error)
    throw error
  }
}

export const getUserProfile = async (id) => {
  const response = await client.get(`/user/${id}/profile`)
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

export const getLike = async (postId) => {
  const response = await client.get(`/post/${postId}/like`)

  return response.data
}
export const getUserConversation = async () => {
  try {
    const response = await client.get('/chat/dm/conv')

    console.log('Response from backend:', response)

    console.log('response')

    console.log(response.data.conversations)

    return response.data.conversations
  } catch (error) {
    console.error('Error fetching conversations:', error)
    return []
  }
}
