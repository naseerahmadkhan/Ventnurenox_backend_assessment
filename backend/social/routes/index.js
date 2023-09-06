const express = require('express');
const router = express.Router();
const tenantRoutes = require('./tenantRoutes');
const userRoutes = require('./userRoutes');

router.use('/t', tenantRoutes);
router.use('/user', userRoutes);

module.exports = router;
