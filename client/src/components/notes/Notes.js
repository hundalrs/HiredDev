import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: "",
      jobID: "",
      position: "",
      company: ""
    };

    this.onChange = this.onChange.bind(this);
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
        notes: jobState[0].notes,
        position: jobState[0].position,
        company: jobState[0].company,
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="add-job">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-info mt-4">
                Go Back
              </Link>
              <div className="mt-4">
                <h1 className="display-4 text-center mb-5">
                  Notes for {this.state.position} at {this.state.company}
                </h1>
              </div>
              <p className="box">
                <pre>{this.state.notes}</pre>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Notes.proptypes = {
  myjobs: PropTypes.object.isRequired
};

export default Notes;
