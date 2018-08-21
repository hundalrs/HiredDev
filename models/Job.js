const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  allJobs: [
    {
      company: {
        type: String,
        required: true
      },
      position: {
        type: String,
        required: true
      },
      contact_name: {
        type: String
      },
      contact_email: {
        type: String
      },
      contact_phone: {
        type: String
      },
      offer: {
        type: String
      }
    }
  ]
});

module.exports = Job = mongoose.model("job", JobSchema);
