const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfessorSchema = new Schema(
    {
        nome: String,
        email: String,
        senha: String,
        turma: String,
        type: {
            type: String,
            default: 'professor'
        }
    },
    {
        timestamps: true
    },
    {
        collection: 'professores'
    }
);

const Professor = mongoose.model('Professor', ProfessorSchema);

module.exports = Professor;