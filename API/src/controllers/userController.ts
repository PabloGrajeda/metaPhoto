import { NextFunction, Request, Response } from 'express'
import { getUserData, getUsersData } from '../services/userServices'

import { LIMIT, OFFSET } from '../constants'

export const getUsers = async (req: Request, res: Response, _next: NextFunction) => {
  try {

    const offset = req.query?.offset && !isNaN(+req.query.offset) ? +req.query.offset : OFFSET
    const limit = req.query?.limit && !isNaN(+req.query.limit) ? +req.query.limit : LIMIT

    const users = await getUsersData(offset, limit)

    res.status(200).json(users)

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

export const getUser = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { id } = req.params
    if (isNaN(+id)) {
      res.status(400).json({ message: `Id '${id}' is not valid.` })
      return
    }

    const user = await getUserData(+id)
    if (!user?.id) {
      res.status(404).json({ message: `User with id ${id} not found.` })
      return
    }

    res.status(200).json(user)

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

