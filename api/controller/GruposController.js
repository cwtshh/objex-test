const Group = require('../models/Group');

const get_all = async(req, res) => {
    const grupos = await Group.find();
    if(!grupos) {
        return res.status(500).json({ message: 'Erro ao buscar grupos' });
    }
    res.status(200).json(grupos);
};

module.exports = {
    get_all
}