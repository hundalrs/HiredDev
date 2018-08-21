const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Jobs Model
const Profile = require("../../models/Job");
// Load User Profile
const User = require("../../models/User");

// @route     GET api/job
// @desc      Get current job statuses
// @access    Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Job.findOne({ user: req.user.id })
      .then(job => {
        if (!job) {
          errors.nojobs = "Looks like you haven't added any jobs yet";
          return res.status(404).json(errors);
        }
        res.json(job);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
