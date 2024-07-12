const jwt = require('jsonwebtoken');
const Aluno = require('../models/Aluno');
const bcrypt = require('bcryptjs');
const secret = process.env.jwt_secret_student;


const generate_token = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: '7d'
    });
};

const authenticate_token = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(401).json({ message: 'Token não fornecido' });
    jwt.verify(token, secret, (err, user) => {
        if(err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        console.log("AUTHENTICATED")
        next();
    })
};

const login_aluno = async(req, res) => {
    const { matricula, senha } = req.body;
    if(!matricula || !senha) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    } 
    const aluno = await Aluno.findOne({ matricula });
    if(!aluno) {
        return res.status(400).json({ message: 'Aluno não encontrado' });
    }
    const pass_match = await bcrypt.compare(senha, aluno.senha);
    if(!pass_match) {
        return res.status(400).json({ message: 'Senha incorreta' });
    }
    res.status(200).json({
        message: 'Aluno logado com sucesso',
        id: aluno._id,
        nome: aluno.nome,
        matricula: aluno.matricula,
        token: generate_token(aluno._id)
    });
};


module.exports = {
    login_aluno,
    authenticate_token
}