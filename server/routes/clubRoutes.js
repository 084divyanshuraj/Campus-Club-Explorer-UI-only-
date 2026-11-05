const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');

router.get('/', clubController.getAllClubs);
router.get('/:id', clubController.getClubById);
router.post('/', clubController.createClub);
router.put('/:id', clubController.updateClub);
router.delete('/:id', clubController.deleteClub);

module.exports = router;

