const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlunoSchema = new Schema(
    {
        nome: String,
        email: String,
        senha: String,
        turma: String,
        matricula: String,
    },
    {
        timestamps: true
    },
    {
        collection: 'alunos'
    }
);

const Aluno = mongoose.model('Aluno', AlunoSchema);

module.exports = Aluno;