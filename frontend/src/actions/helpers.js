import * as actionTypes from "./types";
export const generateModifyStateAction = (newState) => ({
  type: actionTypes.MODIFY_STATE,
  newState: newState,
});
export const dispatchError = (err, dispatch) => {
  if (err.response) {
    console.log("Error fetching posts!", err.response);
  } else {
    console.log("Error fetching posts! no response", err);
  }
  dispatch(
    generateModifyStateAction({
      isLoading: false,
      showSnackbar: true,
      snackbarMessage: "Some error occured!",
    })
  );
};
