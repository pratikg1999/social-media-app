import * as actionTypes from "./types";

const clearState = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_STATE });
};

const modifyState = (newState) => async (dispatch) => {
  dispatch({ type: actionTypes.MODIFY_STATE, newState: newState });
};

export default {
  clearState,
  modifyState,
};
