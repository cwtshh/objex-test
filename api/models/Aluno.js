const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlunoSchema = new Schema(
    {
        nome: String,
        email: String,
        senha: String,
        turma: String,
        matricula: String,
        already_in_group: {
            type: Boolean,
            default: false
        },
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