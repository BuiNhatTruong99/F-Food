const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/config", (req, res) => {
  return res.status(200).json({
    success: true,
    data: process.env.REACT_APP_PAYPAL_CLIENT_ID,
  });
});

module.exports = router;
