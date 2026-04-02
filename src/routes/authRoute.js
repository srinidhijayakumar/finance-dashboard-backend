const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.send("Only admin access");
});
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;