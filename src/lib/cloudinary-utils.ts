import 'server-only'
import { cloudinary } from './cloudinary'

export function getImageUrl(id: string) {
  return cloudinary.v2.image(id)
}
