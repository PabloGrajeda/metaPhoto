import { NextFunction, Request, Response } from 'express'
import { getAlbumData, getAlbumsData } from '../services/albumServices'

import { LIMIT, OFFSET } from '../constants'

export const getAlbums = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const offset = req.query?.offset && !isNaN(+req.query.offset) ? +req.query.offset : OFFSET
    const limit = req.query?.limit && !isNaN(+req.query.limit) ? +req.query.limit : LIMIT

    const albums = await getAlbumsData(offset, limit)

    res.status(200).json(albums)

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

export const getAlbum = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { id } = req.params
    if (isNaN(+id)) {
      res.status(400).json({ message: `Id '${id}' is not valid.` })
      return
    }

    const album = await getAlbumData(+id)
    if (!album?.id) {
      res.status(404).json({ message: `Album with id ${id} not found.` })
      return
    }

    res.status(200).json(album)

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}