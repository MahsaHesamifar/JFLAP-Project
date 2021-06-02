const automataModel = require('../models/automataModel');

const NFAtoDFA = require('../util/NFAtoDFA');

const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');

exports.getAutomata = catchAsync(async (req, res, next) => {

  const automata = await automataModel.find();
  if (!automata) {
    return next(new AppError("There is no automata!", 404));
  }
  res.status(200).json({
    status: 'successful',
    automata,
  });
});

exports.createAutomata = catchAsync(async (req, res, next) => {

  const newAutomata = await automataModel.create({
    alphabet: req.body.alphabet,
    transitionTable: req.body.transitionTable,
    startState: req.body.startState,
    finalStates: req.body.finalStates,
  });

  res.status(201).json({
    status: 'successful',
    newAutomata,
  });
});

exports.deleteAutomata = catchAsync(async (req, res, next) => {

  const automata = await automataModel.find();
  if (!automata) {
    return next(new AppError("There is no automata!", 404));
  }

  await automataModel.deleteMany();

  res.status(201).json({
    status: 'successful',
    automata,
  });

});

exports.NFAtoDFA = catchAsync(async (req, res, next) => {

  const automata = await automataModel.find();
  if (!automata) {
    return next(new AppError("There is no automata!", 404));
  }

  let newAutomata = NFAtoDFA(automata[0]);

  res.status(200).json({
    status: 'successful',
    newAutomata,
  });
});

exports.Reduction = catchAsync(async (req, res, next) => {

  const automata = await automataModel.find();
  if (!automata) {
    return next(new AppError("There is no automata!", 404));
  }

  // let DFA = NFAtoDFA(automata[0])
  // let newAutomata = Reduction(DFA);

  res.status(200).json({
    status: 'successful',
    newAutomata,
  });
});