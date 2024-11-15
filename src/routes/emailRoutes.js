const express = require('express');
const router = express.Router();
const EmailController = require('../controllers/emailController');

router.post('/email', EmailController.createEmail.bind(EmailController));
router.get('/email/:email/:sid', EmailController.getEmails.bind(EmailController));
router.get('/email/:email/:sid/:emailId', EmailController.getEmailContent.bind(EmailController));

module.exports = router;