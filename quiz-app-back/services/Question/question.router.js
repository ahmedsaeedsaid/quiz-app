const express = require('express');
const Quiz = require('./question.controller');

const router = express.Router();

router.get('/getQuestions',Quiz.getQuestions);

module.exports = router;