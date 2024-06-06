const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageSchema = new Schema(
    {
        student_id: String,
        download_url: String,
        file_name: String,
    },
    {
        timestamps: true,
    },
    {
        collection: 'images',
    }
);

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;