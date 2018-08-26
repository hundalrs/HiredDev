const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateJobInput = require("../../validation/job");

// Load Jobs Model
const Job = require("../../models/Job");
// Load User Profile
const User = require("../../models/User");

// @route     GET api/jobs
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
          errors.noJobs = "Looks like you haven't added any jobs yet";
          return res.status(404).json(errors);
        }
        res.json(job);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route     GET api/jobs/:id
// @desc      Get specific job info
// @access    Private
router.get(
  "/:job_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const jobSearch = req.params.job_id;
    Job.findOne({ user: req.user.id })
      .then(job => {
        job.allJobs.forEach(item => {
          if (item.id === jobSearch) {
            res.json(item);
          }
        });
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route     POST api/jobs/add
// @desc      Add job to job route
// @access    Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateJobInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Job.findOne({ user: req.user.id }).then(job => {
      const newJob = {
        company: req.body.company,
        position: req.body.position,
        stage: req.body.stage,
        contactName: req.body.contactName,
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
        location: req.body.location,
        status: req.body.status,
        notes: req.body.notes
      };

      if (!job) {
        job = new Job({ user: req.user.id });
        job.allJobs = [];
      }

      // Add to allJobs array
      job.allJobs.unshift(newJob);

      job.save().then(job => res.json(job));
    });
  }
);

// @route     POST api/jobs/edit
// @desc      Edit job to job route
// @access    Private
router.post(
  "/edit/:job_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateJobInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Job.findOne({ user: req.user.id })
      .then(job => {
        // Edit at index
        const editIndex = job.allJobs
          .map(item => item.id)
          .indexOf(req.params.job_id);

        // Splice out of array
        job.allJobs.splice(editIndex, 1);

        // Create Updated Job
        const newJob = {
          company: req.body.company,
          position: req.body.position,
          contactName: req.body.contactName,
          contactEmail: req.body.contactEmail,
          contactPhone: req.body.contactPhone,
          location: req.body.location,
          status: req.body.status,
          notes: req.body.notes
        };

        // Add to allJobs array
        job.allJobs.unshift(newJob);

        // Save
        job.save().then(job => res.json(job));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route     DELETE api/jobs/delete/:job_id
// @desc      Delete job from jobs list
// @access    Private
router.delete(
  "/delete/:job_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Job.findOne({ user: req.user.id })
      .then(job => {
        // Get remove index
        const removeIndex = job.allJobs
          .map(item => item.id)
          .indexOf(req.params.job_id);

        // Splice out of array
        job.allJobs.splice(removeIndex, 1);

        // Save
        job.save().then(job => res.json(job));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
