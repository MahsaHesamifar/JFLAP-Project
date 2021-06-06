const automataModel = require("../models/automataModel");

const NFAtoDFA = require("../util/NFAtoDFA");
const MinimizeDFA = require("../util/MinimizeDFA");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

//controllers
exports.getAutomata = catchAsync(async (req, res, next) => {
  const automata = await automataModel.findOne();
  if (!automata) {
    return next(new AppError("There is no automata!", 404));
  }
  res.status(200).json({
    status: "successful",
    automata,
  });
});

exports.createAutomata = catchAsync(async (req, res, next) => {
  //only can create one
  const automata = await automataModel.findOne();
  if (automata) {
    return next(
      new AppError(
        "You already create an automata. Delete this one then create a new one!",
        404
      )
    );
  }

  const newAutomata = await automataModel.create({
    alphabet: req.body.alphabet,
    transitionTable: req.body.transitionTable,
    startState: req.body.startState,
    finalStates: req.body.finalStates,
  });
  console.log(newAutomata);
  res.status(201).json({
    status: "successful",
    newAutomata,
  });
});

exports.deleteAutomata = catchAsync(async (req, res, next) => {
  const automata = await automataModel.findOne();
  if (!automata) {
    return next(new AppError("There is no automata!", 404));
  }

  await automataModel.deleteMany();

  res.status(201).json({
    status: "successful",
    automata,
  });
});

exports.NFAtoDFA = catchAsync(async (req, res, next) => {
  const automata = await automataModel.findOne();
  if (!automata) {
    return next(new AppError("There is no automata!", 404));
  }

  let dfaAutomata = NFAtoDFA(automata);

  res.status(200).json({
    status: "successful",
    dfaAutomata,
  });
});

exports.MinimizeDFA = catchAsync(async (req, res, next) => {
  const automata = await automataModel.findOne();
  if (!automata) {
    return next(new AppError("There is no automata!", 404));
  }

  //first convert nfa to dfa then minimize it
  let DFA = NFAtoDFA(automata);
  let minimizedAutomata = MinimizeDFA(DFA);

  res.status(200).json({
    status: "successful",
    minimizedAutomata,
  });
});
