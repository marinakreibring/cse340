// intentionalError.js for week 3 assignment
const express = require('express');
const router = express.Router();
const controller = require('../controllers/intentionalErrorController');

router.get('/intentional-error', controller.triggerError);

module.exports = router;