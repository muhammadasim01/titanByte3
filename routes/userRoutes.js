const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const router = express.Router();

const userController = require("../controllers/UserController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/getuser", authenticateToken, userController.getUserData);

module.exports = router;
