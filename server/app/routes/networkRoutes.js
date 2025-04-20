const express = require('express');
const router = express.Router();
const networkController = require('../controller/networkController.js');

router.get('/', networkController.getAllNetworks);
router.get('/:id', networkController.getNetworkById);
router.post('/', networkController.createNetwork);
router.patch('/:id', networkController.updateNetwork);
router.delete('/:id', networkController.deleteNetwork);

module.exports = router;
