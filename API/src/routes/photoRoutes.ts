import express from 'express'
import { getPhotos, getPhoto } from '../controllers/photoController'

const router = express.Router()

router.get('/', getPhotos)
router.get('/:id', getPhoto)

export default router
