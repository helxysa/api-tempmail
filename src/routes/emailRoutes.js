const express = require('express');
const router = express.Router();
const EmailController = require('../controllers/emailController');

router.get('/', EmailController.getApiInfo.bind(EmailController));
router.post('/email', EmailController.createEmail.bind(EmailController));
router.get('/email/:email/:sid', EmailController.getEmails.bind(EmailController));
router.get('/email/:email/:sid/:emailId', EmailController.getEmailContent.bind(EmailController));

module.exports = router;