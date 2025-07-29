import dotenv from 'dotenv'
import {v2 as cloudinary} from "cloudinary"

dotenv.config()

cloudinary.config({ 
  cloud_name: 'CLOUDINARY_NAME', 
  api_key: 'CLOUDINARY_API_KEY', 
  api_secret: 'CLOUDINARY_SECRET_KEY'
});

export default cloudinary