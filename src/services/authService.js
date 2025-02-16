import client from './config'

export const signUp = async (data) => {
  const response = await client.post('/auth/signup', data)
  const token = response.data.token
  localStorage.setItem('authToken', token)
  return response.data
}

export const signIn = async (data) => {
  const response = await client.post('/auth/signin', data)
  const token = response.data.token

  localStorage.setItem('authToken', token)
  return response.data
}

export const tweet = async (data) => {
  const response = await client.post('/post/tweet', data)
  console.log(data)

  return response.data
}

export const like = async (id) => {
  const response = await client.post(`/post/${id}/like`)

  return response.data
}

export const dislike = async (id) => {
  const response = await client.post(`/post/${id}/dislike`)

  return response.data
}
