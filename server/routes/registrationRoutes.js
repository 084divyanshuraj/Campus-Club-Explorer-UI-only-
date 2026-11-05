const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

router.post('/', registrationController.createRegistration);
router.get('/', registrationController.getRegistrations);
router.patch('/:id/status', registrationController.updateRegistrationStatus);
router.delete('/:id', registrationController.deleteRegistration);

module.exports = router;

