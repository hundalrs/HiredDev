const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateJobInput(data) {
  let errors = {};

  data.company = !isEmpty(data.email) ? data.email : "";
  data.position = !isEmpty(data.password) ? data.password : "";
  data.stage = !isEmpty(data.stage) ? data.stage : "";

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company is required";
  }

  if (Validator.isEmpty(data.position)) {
    errors.position = "Position is required";
  }

  if (Validator.isEmpty(data.stage) {
    errors.stage = "Stage is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
