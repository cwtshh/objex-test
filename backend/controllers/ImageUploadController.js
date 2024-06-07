const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const { initializeApp } = require('firebase/app');
const Image = require('../models/Image');
/* const firestore_db = require('../config/firestore_db'); */


const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage();

const upload_image = async(req, res) => {
    try {
        const file = req.file;
        const { student_id } = req.body;
        if(!file) return res.status(400).json({ message: 'No file uploaded'});
        const storageRef = ref(storage, `images/${file.originalname}`);
        const metaData = {
            contentType: file.mimetype
        };
        const snapshot = await uploadBytesResumable(storageRef, file.buffer, metaData);
        const downloadUrl = await getDownloadURL(storageRef);
        const new_image = Image.create({
            student_id: student_id,
            file_name: file.originalname,
            download_url: downloadUrl
        });
        if(!new_image) {
            return res.status(400).json({ message: 'Failed to upload file'});
        }
        return res.status(200).json({ message: 'File uploaded successfully', downloadUrl });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
};

const get_all_images = async(req, res) => {
    try {
        const images = await Image.find();
        if(!images) {
            return res.status(400).json({ message: 'Failed to get images'});
        }
        return res.status(200).json(images);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
};

const delete_img_by_id = async(req, res) => {
    const { id } = req.body;
    const image = await Image.findByIdAndDelete(id);
    if(!image) {
        return res.status(400).json({ message: 'Failed to delete image'});
    }
    return res.status(200).json({ message: 'Image deleted successfully'});
}



module.exports = {
    upload_image,
    get_all_images,
    delete_img_by_id
}