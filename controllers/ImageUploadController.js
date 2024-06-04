const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const { initializeApp } = require('firebase/app');
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
        if(!file) return res.status(400).json({ message: 'No file uploaded'});
        const storageRef = ref(storage, `images/${file.originalname}`);
        const metaData = {
            contentType: file.mimetype
        };
        const snapshot = await uploadBytesResumable(storageRef, file.buffer, metaData);
        const downloadUrl = await getDownloadURL(storageRef);
        return res.status(200).json({ message: 'File uploaded successfully', downloadUrl });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
}



module.exports = {
    upload_image,
}