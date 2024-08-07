const jwt = require('jsonwebtoken');
const Aluno = require('../models/Aluno');
const bcrypt = require('bcryptjs');
const secret = process.env.jwt_secret_student;
const Grupo = require('../models/Group');
const RespostaImagem = require('../models/RespostaImagem');
const Atividade = require('../models/Atividade');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const { initializeApp } = require('firebase/app');


const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();

const generate_token = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: '7d'
    });
};

const authenticate_token = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(401).json({ message: 'Token não fornecido' });
    jwt.verify(token, secret, (err, user) => {
        if(err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        // console.log("AUTHENTICATED")
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
        email: aluno.email,
        token: generate_token(aluno._id),
        role: 'estudante'
    });
};

const update_senha = async(req, res) => {
    const { id, senha } = req.body;
    // console.log(senha);
    if(!senha) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(senha, salt);
    const aluno = await Aluno.findById(id);
    aluno.senha = hash;
    await aluno.save();
    res.status(200).json({ message: 'Senha atualizada com sucesso' });
}

const responder_atividade_imagem = async(req, res) => {
    const file = req.file;
    const { atividade, aluno } = req.body;

    res.send({atividade, aluno});
    console.log(file);
    console.log(atividade);
    console.log(aluno);

    // res.send(req.file);
    // if(!file || !atividade_id || !aluno_id) {
    //     return res.status(400).json({ message: 'Preencha todos os campos' });
    // }
    // const aluno = await Aluno.findById(aluno_id);
    // const atividade = await Atividade.findById(atividade_id);

    // // so para garantir
    // if(!aluno || !atividade) {
    //     return res.status(400).json({ message: 'Aluno ou atividade não encontrados' });
    // }

    // const storageRef = ref(storage, `respostas/${atividade_id}/${aluno_id}-${aluno.matricula}-${file.originalname}`);
    // const metadata = {
    //     contentType: file.mimetype
    // };
    // await uploadBytesResumable(storageRef, file.buffer, metadata);
    // const downloadURL = await getDownloadURL(storageRef);
    // const resposta = RespostaImagem.create({
    //     aluno: aluno_id,
    //     atividade: atividade_id,
    //     imageURL: downloadURL
    // });
    // if(!resposta) {
    //     return res.status(500).json({ message: 'Erro ao salvar resposta' });
    // }
    // res.status(200).json({ message: 'Resposta salva com sucesso' });
};

const entrar_grupo = async(req, res) => {
    const { id, grupo_id } = req.body;
    const aluno = await Aluno.findById(id);
    if(!aluno) {
        return res.status(400).json({ message: 'Aluno não encontrado' });
    }
    const grupo = await Grupo.findById(grupo_id);
    if(!grupo) {
        return res.status(400).json({ message: 'Grupo não encontrado' });
    }

    if(grupo.membros.includes(id)) {
        return res.status(400).json({ message: 'Aluno já está no grupo' });
    }

    grupo.membros.push(id);
    await grupo.save();
    res.status(200).json({ message: 'Aluno entrou no grupo com sucesso' });
}

const sair_grupo = async(req, res) => {
    const { id, grupo_id } = req.body;
    const aluno = await Aluno.findById(id);
    if(!aluno) {
        return res.status(400).json({ message: 'Aluno não encontrado' });
    }
    const grupo = await Grupo.findById(grupo_id);
    if(!grupo) {
        return res.status(400).json({ message: 'Grupo não encontrado' });
    }
    grupo.membros = grupo.membros.filter(membro => membro !== id);
    await grupo.save();
    res.status(200).json({ message: 'Aluno saiu do grupo com sucesso' });
}

const get_all_members_by_id = async(req, res) => {
    const { ids } = req.body;
    const alunos = await Aluno.find({ _id: { $in: ids } });
    if(!alunos) {
        return res.status(400).json({ message: 'Alunos não encontrados' });
    }
    res.status(200).json(alunos);
}

const get_by_id = async(req, res) => {
    const { id } = req.params;
    const aluno = await Aluno.findById(id).select('nome');
    if(!aluno) {
        return res.status(400).json({ message: 'Aluno não encontrado' });
    }
    res.status(200).json(aluno);
}


module.exports = {
    login_aluno,
    authenticate_token,
    update_senha,
    responder_atividade_imagem,
    entrar_grupo,
    get_all_members_by_id,
    get_by_id,
    sair_grupo
}