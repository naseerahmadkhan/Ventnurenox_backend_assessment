const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post("/post-user", userController.create);
router.get("/user/:id", userController.getById);
router.get("/user-qry/:id", userController.getWithTenantInfo);

module.exports = router;
