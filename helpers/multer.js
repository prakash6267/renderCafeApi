const multer =  require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


//-- use in local upload image----------------------------------------

//const fs = require('fs');
//const uploadDirectory = 'public/uploads';

// if (!fs.existsSync(uploadDirectory)) {
//     fs.mkdirSync(uploadDirectory, { recursive: true });
// }

// const FILE_TYPE_MAP = {
//     'image/png': 'png',
//     'image/jpeg': 'jpeg',
//     'image/jpg': 'jpg',
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const isValid = FILE_TYPE_MAP[file.mimetype];
//         let uploadError = new Error('invalid image type');

//         if (isValid) {
//             uploadError = null;
//         }
//         cb(uploadError, uploadDirectory); 
//     },
//     filename: function (req, file, cb) {
//         const filename = file.originalname.split(' ').join('-');
//         const extension = FILE_TYPE_MAP[file.mimetype];
//         cb(null, `${filename}-${Date.now()}.${extension}`);
//     }
// });

//-------------------cloudnery upload image-------------------


cloudinary.config({
  cloud_name: 'drwnbntvg',
  api_key: '691238734458285',
  api_secret: 'lnwViRinP2udjb8Lw9SVnFN9zMo'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'public/uploads', // Optional - specify the folder in Cloudinary to store the images
    allowed_formats: ['jpg', 'png'], // Optional - specify allowed image formats
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional - specify image transformation
  }
});

const upload = multer({ storage: storage })

module.exports = upload;
