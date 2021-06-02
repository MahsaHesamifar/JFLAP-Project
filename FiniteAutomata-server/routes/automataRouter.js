const express = require('express');
const Router = express.Router();

const automataController = require('../contollers/automataController');

Router.route('/new-automata')
  .post(automataController.createAutomata);

Router.route('/show-automata')
  .get(automataController.getAutomata);

Router.route('/delete-automata')
  .get(automataController.deleteAutomata);

Router.route('/nfa2dfa')
  .get(automataController.NFAtoDFA);

Router.route('/minimize')
  .get(automataController.Reduction);

module.exports = Router;