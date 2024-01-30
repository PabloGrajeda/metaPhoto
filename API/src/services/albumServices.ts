import { AlbumEntry, AlbumResponse, UserEntry } from '../types'
import { indexArrayById } from '../utils'
import { getUserData } from './userServices'

export const getAlbumsData = async (offset: number, limit: number) => {
  try {
    let [albums, users] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/albums').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
    ]) as [AlbumEntry[], UserEntry[]]

    // Index users so search is faster
    const indexedUsers: { [key: string]: UserEntry } = indexArrayById(users)

    const response = albums.map(album => {
      const { userId, ...restOfAlbum } = album
      return {
        ...restOfAlbum,
        user: indexedUsers[userId] || {}
      }
    })

    return {
      albums: response
        .slice(offset, offset + limit),
      total: response.length,
      pages: Math.ceil(response.length / limit)
    }


  } catch (error) {
    console.log('Error in getAlbumsData: ', error)
    throw error

  }
}

export const getAlbumData = async (albumId: number) => {
  try {
    const album: AlbumEntry = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`).then(res => res.json())

    // fetch user for album
    const { userId, ...restOfAlbum } = album
    const user: UserEntry = await getUserData(userId)


    const response: AlbumResponse = {
      ...restOfAlbum,
      user
    }

    return response

  } catch (error) {
    console.log('Error in getAlbumData: ', error)
    throw error

  }
}
