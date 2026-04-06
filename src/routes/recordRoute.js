const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const recordController = require("../controllers/recordController");

/**
 * @swagger
 * tags:
 *   name: Records
 *   description: Financial record APIs
 */
/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a new financial record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, type, category]
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Record created
 */
router.post("/", protect, authorize("admin"), recordController.createRecord);
/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all records with pagination
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of records
 */
router.get("/", protect, authorize("admin", "analyst"), recordController.getRecords);
router.put("/:id", protect, authorize("admin"), recordController.updateRecord);
router.delete("/:id", protect, authorize("admin"), recordController.deleteRecord);
router.get("/summary", protect, authorize("admin", "analyst"), recordController.getSummary);
router.get("/category", protect, authorize("admin", "analyst"), recordController.getCategoryBreakdown);
console.log(recordController);
/**
 * @swagger
 * /api/records/trends:
 *   get:
 *     summary: Get monthly income and expense trends
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly trends data
 */
router.get("/trends", protect, recordController.getMonthlyTrends);
/**
 * @swagger
 * /api/records/activity:
 *   get:
 *     summary: Get recent activity (last 5 records)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent records
 */
router.get("/activity", protect, recordController.getRecentActivity);
/**
 * @swagger
 * /api/records/dashboard:
 *   get:
 *     summary: Get full dashboard analytics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 */
router.get("/dashboard", protect, recordController.getDashboard);
module.exports = router;