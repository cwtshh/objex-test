const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        course: String,
    },
    {
        timestamps: true,
    },
    {
        collection: 'teachers',
    }
);
const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;