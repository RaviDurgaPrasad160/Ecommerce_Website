import axios from 'axios'

const CLOUDINARY_CLOUD_NAME = 'dendai0hh'
const UPLOAD_PRESET = 'mern_product'

const uploadImage = async (image) => {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY)

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        )
        return response.data.secure_url
    } catch (err) {
        console.log(err)
        throw err
    }
}

export default uploadImage