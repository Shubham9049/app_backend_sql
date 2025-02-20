const express = require("express");
const { signup, login,getAllUsers } = require("../controller/authController");
const { verifyToken } = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getAllUsers); // Protected route


module.exports = router;
