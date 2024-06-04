const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema(
    {
        name: String,
        description: String,
        posted_on: {
            type: Date,
            default: Date.now,
        },
        due_date: Date,
        course: String,
        teacher_id: String
    },
    {
        timestamps: true,
    },
    {
        collection: 'exercises',
    }
);

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;