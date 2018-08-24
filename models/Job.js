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
      contactName: {
        type: String
      },
      contactEmail: {
        type: String
      },
      contactPhone: {
        type: String
      },
      offer: {
        type: String
      },
      status: {
        type: String
      },
      location: {
        type: String
      }
    }
  ]
});

module.exports = Job = mongoose.model("job", JobSchema);
