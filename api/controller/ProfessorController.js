const Professor = require('../models/Professor');
const Aluno = require('../models/Aluno');
const Monitor = require('../models/Monitor');
const Group = require('../models/Group');
const Turma  = require('../models/Turma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.jwt_secret_teacher;

const generate_token = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: '7d'
    });
};

const verify_token = async(req, res) => {
    const { token } = req.body;
    const verify = jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            return false;
        }
        return true;
    })
    if(verify) {
        return res.status(200).json({ message: 'Token válido' });
    }
    return res.status(200).json({ message: 'Token inválido' });
}

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

const register_professor = async(req, res) => {
    const { nome, email, senha, turma } = req.body;
    if(!nome || !email || !senha || !turma) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }
    if(await Professor.findOne({ email })) {
        return res.status(400).json({ message: 'Professor já cadastrado' });
    }
    const salt = await bcrypt.genSalt();
    const pass_hash = await bcrypt.hash(senha, salt);
    const new_professor = await Professor.create({
        nome,
        email,
        senha: pass_hash,
        turma
    });
    if(!new_professor) {
        return res.status(500).json({ message: 'Erro ao cadastrar professor' });
    }

    res.status(201).json({ message: 'Professor cadastrado com sucesso' });
};

const login_professor = async(req, res) => {
    const { email, senha } = req.body;
    if(!email || !senha) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }
    const professor = await Professor.findOne({ email });
    if(!professor) {
        return res.status(400).json({ message: 'Professor não cadastrado' });
    }
    if(!await bcrypt.compare(senha, professor.senha)) {
        return res.status(400).json({ message: 'Senha incorreta' });
    }
    res.status(200).json(
        {
            message: 'Professor logado com sucesso',
            id: professor._id,
            nome: professor.nome,
            email: professor.email,
            token: generate_token(professor._id)
        }
    )
};

const register_aluno = async(req, res) => {
    const { nome, email, senha, turma, matricula } = req.body;
    if(!nome || !email || !senha || !turma || !matricula) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }
    if(await Aluno.findOne({ email })) {
        return res.status(400).json({ message: 'Aluno já cadastrado' });
    }
    const salt = await bcrypt.genSalt();
    const pass_hash = await bcrypt.hash(senha, salt);
    const new_aluno = await Aluno.create({
        nome,
        email,
        senha: pass_hash,
        turma,
        matricula
    });
    if(!new_aluno) {
        return res.status(500).json({ message: 'Erro ao cadastrar aluno' });
    }

    res.status(201).json({ message: 'Aluno cadastrado com sucesso' });
};

const create_group = async(req, res) => {
    const { nome, descricao, turma} = req.body;
    if(!nome || !descricao || !turma) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }
    const new_group = await Group.create({
        nome,
        descricao,
        turma,
    });
    if(!new_group) {
        return res.status(500).json({ message: 'Erro ao criar grupo' });
    }
    res.status(201).json({ message: 'Grupo criado com sucesso' });
}

const get_professores_name_id = async(req, res) => {
    const professores = await Professor.find({}, { nome: 1, _id: 1});
    if(!professores) {
        return res.status(500).json({ message: 'Erro ao buscar professores' });
    };
    res.status(200).json(professores);
};

const create_turma = async(req, res) => {
    const { nome, professor_id } = req.body;
    if(!nome || !professor_id) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }
    if(!await Professor.findOne({ _id: professor_id })) {
        return res.status(400).json({ message: 'Professor não encontrado' });
    }
    const new_turma = await Turma.create({
        nome,
        professor: professor_id
    });
    if(!new_turma) {
        return res.status(500).json({ message: 'Erro ao criar turma' });
    }
    res.status(201).json({ message: 'Turma criada com sucesso' });
};

const get_turmas = async(req, res) => {
    const turmas = await Turma.find();
    if(!turmas) {
        return res.status(500).json({ message: 'Erro ao buscar turmas' });
    }
    res.status(200).json(turmas);
}

module.exports = {
    register_professor,
    login_professor,
    authenticate_token,
    register_aluno,
    verify_token,
    create_group,
    get_professores_name_id,
    create_turma,
    get_turmas
}