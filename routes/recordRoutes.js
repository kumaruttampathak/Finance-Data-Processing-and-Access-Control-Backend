const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// All record routes require authentication
router.use(auth);

// Viewers can GET
router.get('/', roleCheck(['Admin', 'Analyst', 'Viewer']), recordController.getRecords);
router.get('/:id', roleCheck(['Admin', 'Analyst', 'Viewer']), recordController.getRecordById);

// Analysts can GET and access summary
router.get('/dashboard/summary', roleCheck(['Admin', 'Analyst']), recordController.getSummary);

// Admins can POST, PUT, DELETE
router.post('/', roleCheck(['Admin']), recordController.createRecord);
router.put('/:id', roleCheck(['Admin']), recordController.updateRecord);
router.delete('/:id', roleCheck(['Admin']), recordController.deleteRecord);

module.exports = router;