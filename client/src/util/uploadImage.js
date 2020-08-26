import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const uploadImage = async (image) => {
  let formData = new FormData();
  formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
  formData.append('file', image);
  formData.append('public_id', `${uuidv4()}`);
  formData.append('timestamp', `${Date.now()}`);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
  return await axios.post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, formData);
};
