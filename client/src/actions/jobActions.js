import axios from "axios";

import {
  GET_JOBS,
  JOBS_LOADING,
  CLEAR_CURRENT_JOBS,
  GET_ERRORS
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
