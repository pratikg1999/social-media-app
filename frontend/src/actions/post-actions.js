import axios from "../axiosInstance";
import * as actionTypes from "./types";
import { generateModifyStateAction, dispatchError } from "./helpers";

// helper functions
const putPostLike = async (postId, dispatch) => {
  try {
    const { data } = await axios.put("/post/likes", { postId });
    dispatch({ type: actionTypes.UPDATE_LIKES, postId: postId, likes: data });
  } catch (err) {
    dispatchError(err, dispatch);
  }
};
const deletePostLike = async (postId, dispatch) => {
  try {
    const { data } = await axios.delete("/post/likes", { data: { postId } });
    dispatch({ type: actionTypes.UPDATE_LIKES, postId: postId, likes: data });
  } catch (err) {
    dispatchError(err, dispatch);
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/post/fetchPosts");
    dispatch(generateModifyStateAction({ postsData: data }));
  } catch (err) {
    dispatchError(err, dispatch);
  }
};

export const addPost = (postData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/post/createPost", postData);
    dispatch({ type: actionTypes.ADD_POST, newPost: data });
  } catch (err) {
    dispatchError(err, dispatch);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/post/${postId}`);
    dispatch({ type: actionTypes.DELETE_POST, postId: postId });
  } catch (err) {
    dispatchError(err, dispatch);
  }
};

export const editPost = (postId, postData) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/post/${postId}`, postData);
    dispatch({
      type: actionTypes.EDIT_POST,
      postId: postId,
      updatedPost: data,
    });
  } catch (err) {
    dispatchError(err, dispatch);
  }
};

export const changePostLike = (postId, status) => async (dispatch) => {
  if (status) {
    putPostLike(postId, dispatch);
  } else {
    deletePostLike(postId, dispatch);
  }
};

export default {
  getPosts,
  addPost,
  deletePost,
  editPost,
  changePostLike,
};
