const express = require('express');
const songController = require('../controllers/song.controller');
const upload = require('../middlewares/song.middleware');

const router = express.Router();


router.post('/', upload.single('song'),songController.uploadSong);

module.exports = router;