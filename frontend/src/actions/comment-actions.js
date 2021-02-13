import axios from "../axiosInstance";
import * as actionTypes from "./types";
import { dispatchError } from "./helpers";

export const deleteComment = (commentId, postId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/comment/${commentId}`);
    dispatch({
      type: actionTypes.DELETE_COMMENT,
      commentId: commentId,
      postId: postId,
    });
  } catch (err) {
    dispatchError(err, dispatch);
  }
};

export const addComment = (newComment) => async (dispatch) => {
  try {
    const { data } = await axios.post("/comment/createComment", newComment);
    dispatch({ type: actionTypes.ADD_COMMENT, comment: data });
  } catch (err) {
    dispatchError(err, dispatch);
  }
};

export default {
  deleteComment,
  addComment,
};
