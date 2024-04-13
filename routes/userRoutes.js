const express = require("express");
const userCtrl = require("../controller/userController");
const router = express.Router();

router.route("/api/users/register").post(userCtrl.createUser);


module.exports = router;
