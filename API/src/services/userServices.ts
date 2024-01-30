import { UserEntry } from '../types'

export const getUsersData = async (offset: number, limit: number) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()) as UserEntry[]

    return {
      users: response
        .slice(offset, offset + limit),
      total: response.length,
      pages: Math.ceil(response.length / limit)
    }

  } catch (error) {
    console.log('Error in getUsersData: ', error)
    throw error

  }
}

export const getUserData = async (userId: number) => {
  try {

    const user = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res => res.json()) as UserEntry

    return user

  } catch (error) {
    console.log('Error in getUserData: ', error)
    throw error

  }
}
