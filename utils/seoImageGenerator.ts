import { URLS } from './constants'

export const generateNftImage = (
  name: string,
  price: string,
  image: string,
  mimeType = ''
): string => {
  return `${URLS.koda.seoCard}${encodeURIComponent(
    name
  )}.jpeg?price=${price}&image=${image}&mime=${mimeType}&type=image.jpg`
}

export const generateCollectionImage = (
  name: string,
  itemCount: string | number,
  image: string
) => {
  return generateNftImage(name, `Items:${itemCount}`, image)
}
