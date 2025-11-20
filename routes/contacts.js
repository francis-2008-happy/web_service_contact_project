const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createcontact);

router.put('/:id', contactsController.updatecontact);

router.delete('/:id', contactsController.deletecontact);



module.exports = router;
