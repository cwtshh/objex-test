const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RespostaImagemSchema = new Schema(
    {
        aluno: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Aluno'
        },
        atividade: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Atividade'
        },
        imageURL: String,
        nota: {
            type: Number,
            default: null
        }
    },
    {
        timestamps: true
    },
    {
        collection: "respostas_imagens"
    }
);

const RespostaImagem = mongoose.model('RespostaImagem', RespostaImagemSchema);

module.exports = RespostaImagem;