const express = require("express");
const taskCtrl = require("../controllers/task.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.route("/api/task-allocation").post(taskCtrl.createTask);
router.route("/api/:assignedToObjectId").get(taskCtrl.getTask);
router.route("/tasks/:taskId/status").put(taskCtrl.statusUpdate);
router.route("/tasks/:taskId/deadlineUpdate").put(taskCtrl.deadlineUpdate);
router.route("/tasks/:taskId/addComments").put(taskCtrl.addComments);

module.exports = router;
