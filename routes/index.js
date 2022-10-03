const express = require('express');
const router = express.Router();

const homeControllers = require('../controllers/homeControllers');

router.get('/', homeControllers.home);
router.get('/:page', homeControllers.home);
router.get('/delete-note/:id', homeControllers.deleteNote);
router.get('/toggle-pinned/:id', homeControllers.togglePinned);
router.post('/add-note', homeControllers.addNote);
router.post('/update-note/:id', homeControllers.updateNote);

module.exports = router;