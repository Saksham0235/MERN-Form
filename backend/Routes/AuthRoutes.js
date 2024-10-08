const router = require("express").Router();
const { signup, login } = require("../Controllers/AuthController");
const {
  signupValidation,
  LoginValidation,
} = require("../Middlewares/AuthValidation");

router.post("/login", LoginValidation, login);
router.post("/signup", signupValidation, signup);

module.exports = router;
