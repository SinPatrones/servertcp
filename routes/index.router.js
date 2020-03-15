const express = require('express');
const router = express.Router();

const indexcontroller = require('../controllers/index.controller');

router.get('/', indexcontroller.principal);

router.get('/test', indexcontroller.test);

module.exports = router;