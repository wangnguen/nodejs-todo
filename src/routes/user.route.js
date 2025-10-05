const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

const { isAuth } = require("../middlewares/auth");

router.post("/login", userController.loginPost);
router.post("/register", userController.registerPost);
router.post("/refresh-token", userController.refreshToken);
router.post("/logout", isAuth, userController.logout);

module.exports = router;
