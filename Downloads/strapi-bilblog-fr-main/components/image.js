import { getStrapiMedia } from "../utils/media"
import NextImage from "next/image"

const Image = ({ image }) => {
  const { url, alternativeText, width, height } = image

  // const loader = () => {
  //   return getStrapiMedia(image)
  // }

  return (
    <NextImage
      // loader={loader}
      layout="responsive"
      width={width}
      height={height}
      objectFit="contain"
      src={getStrapiMedia(url)}
      alt={alternativeText || ""}
    />
  )
}

export default Image
