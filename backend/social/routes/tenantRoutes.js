const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

router.get("/:id", tenantController.getById);
router.get("/get-all", tenantController.getAll);
router.post("/", tenantController.create);
router.delete("/", tenantController.delete);
router.patch("/update", tenantController.update);

module.exports = router;
