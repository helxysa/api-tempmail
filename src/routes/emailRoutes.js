const express = require('express');
const router = express.Router();
const EmailController = require('./controllers/EmailController');

router.post('/email', EmailController.createEmail.bind(EmailController));
router.get('/email/:email/messages', EmailController.getEmails.bind(EmailController));
router.get('/email/:email/message/:emailId', EmailController.getEmailContent.bind(EmailController));

module.exports = router;