import { NextFunction, Request, Response } from 'express'
import { getPhotosData, getPhotoData } from '../services/photoServices'

import { LIMIT, OFFSET } from '../constants'

export const getPhotos = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const offset = req.query?.offset && !isNaN(+req.query.offset) ? +req.query.offset : OFFSET
    const limit = req.query?.limit && !isNaN(+req.query.limit) ? +req.query.limit : LIMIT

    const photoTitle = req.query?.title as string
    const albumTitle = req.query?.['album.title'] as string
    const userEmail = req.query?.['album.user.email'] as string


    const photos = await getPhotosData(offset, limit, photoTitle, albumTitle, userEmail)

    res.status(200).json(photos)

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

export const getPhoto = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { id } = req.params
    if (isNaN(+id)) {
      res.status(400).json({ message: `Id '${id}' is not valid.` })
      return
    }

    const photo = await getPhotoData(id)
    if (!photo?.id) {
      res.status(404).json({ message: `Photo with id ${id} not found.` })
      return
    }

    res.status(200).json(photo)

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}