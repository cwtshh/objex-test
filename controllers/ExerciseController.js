const Exercise = require('../models/Exercise');

const create_exercise = async(req, res) => {
    const { name, description, teacher_id } = req.body;
    if(await Exercise.findOne({ name })) {
        return res.status(400).json({ message: 'Exercise already exists' });
    }

    const new_exercise = await Exercise.create({
        name,
        description,
        teacher_id
    });
    
    if(!new_exercise) {
        return res.status(400).json({ message: 'Failed to create exercise' });
    }

    res.status(201).json({ message: 'Exercise created', exercise: new_exercise });
};


module.exports = {
    create_exercise,
}