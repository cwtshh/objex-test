const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const generate_token = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: '7d'
    });
}

const get_by_id = async(req, res) => {
    const student = await Student.findById(req.params.id).select('-password');
    if(!student) {
        return res.status(400).json({ message: 'Failed to get student' });
    }
    res.status(200).json(student);
}

const get_all_students = async(req, res) => {
    const students = await Student.find().select('-password');
    if(!students) {
        return res.status(400).json({ message: 'Failed to get students' });
    }
    res.status(200).json(students);
}

const register_student = async(req, res) => {
    const { name, email, password, tuition, course } = req.body;
    if(await Student.findOne({ email }) || await Student.findOne({ tuition })) {
        return res.status(400).json({ message: 'Email or Tuituion already exists' });
    }

    const salt = await bcrypt.genSalt();
    const pass_hash = await bcrypt.hash(password, salt);
    const new_student = await Student.create({
        name,
        email,
        password: pass_hash,
        tuition,
        course
    });

    if(!new_student) {
        return res.status(400).json({ message: 'Failed to register user' });
    }

    res.status(201).json({ message: 'User registered', user: new_student, token: generate_token(new_student._id) });
};

const login_student = async(req, res) => {
    const { tuition, password } = req.body;
    const student = await Student.findOne({ tuition });
    if(!student) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if(!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user: student, token: generate_token(student._id)});
}


module.exports = {
    register_student,
    login_student,
    get_all_students,
    get_by_id
}