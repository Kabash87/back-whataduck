const express = require("express");
const router = express.Router();
const User = require("../../../models/User.js");

router.get("/", async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) {
      return res.redirect(
        "http://localhost:3000/login?verified=0&error=missing_token"
      );
    }
    const user = await User.findOne({ emailToken: token });
    if (!user) {
      return res.redirect(
        "http://localhost:3000/login?verified=0&error=invalid_token"
      );
    }
    if (user.isVerified) {
      return res.redirect(
        "http://localhost:3000/login?verified=1&info=already_verified"
      );
    }
    user.emailToken = null;
    user.isVerified = true;
    await user.save();
    return res.redirect("http://localhost:3000/login?verified=1");
  } catch (err) {
    console.error("Error verifying email:", err);
    return res.redirect(
      "http://localhost:3000/login?verified=0&error=server_error"
    );
  }
});

module.exports = router;
