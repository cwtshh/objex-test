const Atividade = require('../models/Atividade');

const get_all_atividades = async(req, res) => {
    const atividades = await Atividade.find();
    if(!atividades) {
        return res.status(500).json({ message: 'Erro ao buscar atividades' });
    }
    res.status(200).json(atividades);
};

const get_by_id = async(req, res) => {
    const { id } = req.params;
    const atividade = await Atividade.findById(id);
    if(!atividade) {
        return res.status(500).json({ message: 'Erro ao buscar atividade' });
    }
    res.status(200).json(atividade);
}

module.exports = {
    get_all_atividades,
    get_by_id
}