const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        tuition: String,
        course: String,
    },
    {
        timestamps: true,
    },
    {
        collection: 'students',
    }
);

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;