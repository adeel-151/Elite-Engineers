const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Universal storage — folder determined by route via req
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine folder from route path
    let folder = 'EliteEngineers/General';
    const url = req.originalUrl;
    if (url.includes('/projects')) folder = 'EliteEngineers/Projects';
    else if (url.includes('/team')) folder = 'EliteEngineers/Team';
    else if (url.includes('/services')) folder = 'EliteEngineers/Services';
    else if (url.includes('/clients')) folder = 'EliteEngineers/Clients';
    else if (url.includes('/gallery')) folder = 'EliteEngineers/Gallery';

    return {
      folder,
      allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],
      format: 'webp',
      transformation: [{ width: 1920, crop: 'limit', quality: 'auto:good' }]
    };
  }
});

module.exports = {
  cloudinary,
  storage
};
