import { ErrorHandler, Identifiable } from './types'

export const buildError = (status: number, message: string): ErrorHandler => {
  return { status, message }
}

export const indexArrayById = (array: Identifiable[]) => {
  return array.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.id]: curr
    }
  }, {})
}
