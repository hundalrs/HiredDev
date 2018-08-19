const express = require("express");
const router = express.Router();

// @route     GET api/jobs/test
// @desc      Tests jobs route
// @access    Public
router.get("/test", (req, res) => res.json({ msg: "Jobs Works" }));

module.exports = router;
