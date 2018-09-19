import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextArea from "../common/TextArea";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editJob } from "../../actions/jobActions";
import classnames from "classnames";

class EditJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      position: "",
      location: "",
      status: "",
      jobID: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onHandle = this.onHandle.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const jobState = this.props.history.location.state.myjobs.filter(job => {
      if (job._id === id) {
        return job;
      }
    });

    this.setState(
      {
        company: jobState[0].company,
        position: jobState[0].position,
        location: jobState[0].location,
        status: jobState[0].status,
        contactName: jobState[0].contactName,
        contactEmail: jobState[0].contactEmail,
        contactPhone: jobState[0].contactPhone,
        notes: jobState[0].notes,
        jobID: jobState[0]._id
      },
      function() {
        console.log(this.state);
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const sendData = {
      company: this.state.company,
      position: this.state.position,
      location: this.state.location,
      status: this.state.status,
      contactName: this.state.contactName,
      contactEmail: this.state.contactEmail,
      contactPhone: this.state.contactPhone,
      notes: this.state.notes
    };

    this.props.editJob(this.state.jobID, sendData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onHandle(e) {
    this.setState({ status: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-job">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-info mt-4">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Job</h1>
              <p className="lead text-center">Change any fields</p>
              <small className="d block pb-3">* = required fields</small>
              <form className="mt-2" onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Position"
                  name="position"
                  value={this.state.position}
                  onChange={this.onChange}
                  error={errors.position}
                />
                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextArea
                  placeholder="Notes"
                  name="notes"
                  value={this.state.notes}
                  onChange={this.onChange}
                  error={errors.notes}
                />
                <div>
                  <select
                    id="status"
                    placeholder="Status"
                    name="status"
                    value={this.state.status}
                    onChange={this.onHandle}
                    error={errors.status}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.status
                    })}
                  >
                    <option value="" disabled>
                      * Status
                    </option>
                    <option>Applied</option>
                    <option>Rejected</option>
                    <option>Phone Interview</option>
                    <option>Final Interview</option>
                    <option>Stage 1</option>
                    <option>Stage 2</option>
                    <option>Stage 3</option>
                    <option>Stage 4</option>
                    <option>Stage 5</option>
                  </select>
                  {errors.status && (
                    <div id="error-text" className="invalid-feedback">
                      {errors.status}
                    </div>
                  )}
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4 mb-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditJob.propTypes = {
  editJob: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editJob }
)(withRouter(EditJob));
