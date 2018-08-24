const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateJobInput(data) {
  let errors = {};

  data.company = !isEmpty(data.company) ? data.company : "";
  data.position = !isEmpty(data.position) ? data.position : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.location = !isEmpty(data.location) ? data.location : "";

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company is required";
  }

  if (Validator.isEmpty(data.position)) {
    errors.position = "Position is required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
