import { PhotoEntry, AlbumEntry, UserEntry, AlbumResponse, PhotoResponse } from '../types'
import { indexArrayById } from '../utils'
import { getAlbumData } from './albumServices'

export const getPhotosData = async (offset: number, limit: number, photoTitle = '', albumTitle = '', userEmail = '') => {
  try {

    const [photos, albums, users] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/photos').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/albums').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
    ]) as [PhotoEntry[], AlbumEntry[], UserEntry[]]

    // Index users and albums so search is faster
    const indexedUsers: { [key: string]: UserEntry } = indexArrayById(users)
    const indexedALbums: { [key: string]: AlbumEntry } = indexArrayById(albums)

    const parsedPhotos = photos.map(photos => {
      const { albumId, ...restOfPhoto } = photos
      const album = indexedALbums[albumId]

      const { userId, ...restOfAlbum } = album
      const user = indexedUsers[userId]

      return {
        ...restOfPhoto,
        album: {
          ...restOfAlbum,
          user
        }
      }
    })

    // Filter photos
    const response = parsedPhotos.filter(photo =>
      (photoTitle ? photo.title.includes(photoTitle) : true)
      && (albumTitle ? photo.album.title.includes(albumTitle) : true)
      && (userEmail ? photo.album.user.email.toUpperCase() === userEmail.toUpperCase() : true)
    )

    return {
      photos: response
        .slice(offset, offset + limit),
      total: response.length,
      pages: Math.ceil(response.length / limit)
    }


  } catch (error) {
    console.log('Error in getPhotosData: ', error)
    throw error

  }
}

export const getPhotoData = async (photoId: string) => {
  try {
    const photo: PhotoEntry = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`).then(res => res.json())

    // fetch album for photo
    const { albumId, ...restOfPhoto } = photo
    const album: AlbumResponse = await getAlbumData(albumId)


    const response: PhotoResponse = {
      ...restOfPhoto,
      album
    }

    return response

  } catch (error) {
    console.log('Error in getPhotoData: ', error)
    throw error

  }

}
