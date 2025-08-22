const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.subirImagen = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      console.warn('⚠️ Archivo vacío o sin buffer');
      return resolve(null); // No rompe el flujo
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'reclamos' },
      (error, result) => {
        if (error) {
          console.error('❌ Error en Cloudinary:', error.message);
          return reject(error);
        }
        console.log('✅ Imagen subida:', result.secure_url);
        resolve(result.secure_url);
      }
    );

    uploadStream.end(file.buffer);
  });
};

