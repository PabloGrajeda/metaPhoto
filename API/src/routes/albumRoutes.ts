import express from 'express'
import { getAlbums, getAlbum } from '../controllers/albumController'

const router = express.Router()

router.get('/', getAlbums)

router.get('/:id', getAlbum)

export default router
