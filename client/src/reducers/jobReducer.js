import {
  GET_JOBS,
  JOBS_LOADING,
  CLEAR_CURRENT_JOBS,
  SPECIFIC_JOB,
  EDIT_JOB
} from "../actions/types";

const initialState = {
  jobs: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case JOBS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_JOBS:
      return {
        ...state,
        jobs: null
      };
    case SPECIFIC_JOB:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case EDIT_JOB:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
