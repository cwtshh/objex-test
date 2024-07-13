const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AtividadeSchema = new Schema(
    {
        nome: String,
        dataEntrega: Date,
        enunciado: String,
        professor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor'
        },
        turma: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Turma'
        },
    },
    {
        timestamps: true
    },
    {
        collection: "atividades"
    }
);

const Atividade = mongoose.model('Atividade', AtividadeSchema);

module.exports = Atividade;