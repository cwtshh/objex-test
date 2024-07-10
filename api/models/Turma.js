const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TurmaSchema = new Schema(
    {
        nome: String,
        horario: String,
        professor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor'
        },
    },
    {
        timestamps: true
    },
    {
        collection: "turmas"
    }
);

module.exports = mongoose.model('Turma', TurmaSchema);

