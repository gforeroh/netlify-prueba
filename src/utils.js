export const getImage = (image, key = "image") => {
    if(typeof(image[key]) === "string") {
        return image[key];
    } else {
        return image[key].childImageSharp === null ? image[key].publicURL : image[key].childImageSharp.fluid.src
    }
}