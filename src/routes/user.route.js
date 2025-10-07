const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

const { isAuth } = require("../middlewares/auth");
const { loginLimiter, registerLimiter } = require("../helpers/rateLimit");

router.post("/login", loginLimiter, userController.loginPost);
router.post("/register", registerLimiter, userController.registerPost);
router.post("/refresh-token", userController.refreshToken);
router.post("/logout", isAuth, userController.logout);

module.exports = router;
