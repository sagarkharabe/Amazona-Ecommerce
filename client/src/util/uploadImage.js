import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (image) => {
  try {
    let formData = new FormData();
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
    formData.append('file', image);
    formData.append('public_id', `${uuidv4()}`);
    formData.append('timestamp', `${Date.now()}`);
    formData.append('upload_preset', 'npzrpq4z');
    const response = await axios.post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, formData);
    console.log(response.data.secure_url);
    return response.data.secure_url;
  } catch (err) {
    console.log(err);
  }
};
