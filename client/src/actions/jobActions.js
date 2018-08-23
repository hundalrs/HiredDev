import axios from "axios";

import { GET_JOBS, JOBS_LOADING, CLEAR_CURRENT_JOBS } from "./types";

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
