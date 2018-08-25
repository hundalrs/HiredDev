import axios from "axios";

import {
  GET_JOBS,
  JOBS_LOADING,
  CLEAR_CURRENT_JOBS,
  GET_ERRORS,
  SPECIFIC_JOB
} from "./types";

// Get Jobs
export const getCurrentJobs = () => dispatch => {
  dispatch(setJobLoading());
  axios
    .get("/api/jobs")
    .then(res =>
      dispatch({
        type: GET_JOBS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOBS,
        payload: {}
      })
    );
};

// Get Specific Job
export const getJob = id => dispatch => {
  axios
    .get(`/api/jobs/${id}`)
    .then(res =>
      dispatch({
        type: GET_JOBS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: SPECIFIC_JOB,
        payload: {}
      })
    );
};

// Add Jobs
export const ADD_JOB = (sendData, history) => dispatch => {
  axios
    .post("/api/jobs/add", sendData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Job

export const deleteJob = id => dispatch => {
  axios
    .delete(`/api/jobs/delete/${id}`)
    .then(res =>
      dispatch({
        type: GET_JOBS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Edit Specific Job
export const editJob = (jobID, sendData, history) => dispatch => {
  axios
    .post(`/api/jobs/edit/${jobID}`, sendData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Jobs loading
export const setJobLoading = () => {
  return {
    type: JOBS_LOADING
  };
};

// Clear Jobs
export const clearJobs = () => {
  return {
    type: CLEAR_CURRENT_JOBS
  };
};
