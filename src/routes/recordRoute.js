const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const recordController = require("../controllers/recordController");
router.post("/", protect, authorize("admin"), recordController.createRecord);

router.get("/", protect, authorize("admin", "analyst"), recordController.getRecords);

router.put("/:id", protect, authorize("admin"), recordController.updateRecord);

router.delete("/:id", protect, authorize("admin"), recordController.deleteRecord);

// 🔥 THESE MUST EXIST
router.get("/summary", protect, authorize("admin", "analyst"), recordController.getSummary);

router.get("/category", protect, authorize("admin", "analyst"), recordController.getCategoryBreakdown);
console.log(recordController);
module.exports = router;