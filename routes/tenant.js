const express = require('express');

let router = express.Router();
let tenantController = require('../controllers/TenantController');

router.post('/save', tenantController.storeTenant);

module.exports = router;
