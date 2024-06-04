const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    file_path: {
        type: String,
        required: true
    },
    tuition: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const File = mongoose.model('file', FileSchema);

module.exports = File;