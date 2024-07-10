const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonitorSchema = new Schema(
    {
        nome: String,
        email: String,
        senha: String,
        turma: String,
        type: {
            type: String,
            default: 'monitor'
        }
    },
    {
        timestamps: true
    },
    {
        collection: 'monitores'
    }
);

const Monitor = mongoose.model('Monitor', MonitorSchema);

module.exports = Monitor;

