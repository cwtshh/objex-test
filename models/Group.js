const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
    {
        name: String,
        description: String,
        members: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    },
    {
        collection: 'groups',
    }
);
const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;