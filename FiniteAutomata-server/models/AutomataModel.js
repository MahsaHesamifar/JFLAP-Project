const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const automataSchema = new Schema({
    alphabet: {
        type: Array,
        required: [true, "A automata must have alphabets."],
    },
    transitionTable: {
        type: Array,
        
    },
    startState: {
        type: String,
        required: [true, "A automata must have a start state."]
    },
    finalStates: {
        type: Array,
    },
}, {
    timestamps: true
});

const automata = mongoose.model('automata', automataSchema);
module.exports = automata;