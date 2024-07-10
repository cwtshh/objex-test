const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
    {
        nome: String,
        descricao: String,
        turma: String,
        lider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Aluno'
        },
        membros: {
            type: Array,
            default: []
        },
    },
    {
        timestamps: true
    },
    {
        collection: 'grupos'
    }
);

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;