const Group = require('../models/Group');
const Student = require('../models/Student');

const get_groups = async(req, res) => {
    const groups = await Group.find();
    res.status(200).json(groups);
}

const create_group = async(req, res) => {
    const { name, description } = req.body;
    if(await Group.findOne({ name })) {
        return res.status(400).json({ message: 'Group already exists' });
    }
    const new_group = await Group.create({
        name,
        description
    });
    if(!new_group) {
        return res.status(400).json({ message: 'Failed to create group' });
    }
    res.status(201).json({ message: 'Group created', group: new_group });
};

const add_student = async(req, res) => {
    const { group_id, student_id } = req.body;
    const group = await Group.findById(group_id);
    if(!group) {
        return res.status(400).json({ message: 'Group not found' });
    }
    if(!await Student.findById(student_id)) {
        return res.status(400).json({ message: 'Student not found' });
    }
    if(group.members.includes(student_id)) {
        return res.status(400).json({ message: 'Student already in group' });
    }
    group.members.push(student_id);
    await group.save();
    res.status(200).json({ message: 'Student added to group', group: group });

};

const remove_student = async(req, res) => {
    const { group_id, student_id } = req.body;
    const group = await Group.findById(group_id);
    if(!group) {
        return res.status(400).json({ message: 'Group not found' });
    }
    if(!group.members.includes(student_id)) {
        return res.status(400).json({ message: 'Student not in group' });
    }
    group.members = group.members.filter(member => member != student_id);
    await group.save();
    res.status(200).json({ message: 'Student removed from group', group: group });
};



module.exports = {
    create_group,
    add_student,
    remove_student,
    get_groups
}