import axios from "../axiosInstance";
import { generateModifyStateAction, dispatchError } from "./helpers";
import { getPosts } from "./post-actions";
import * as actionTypes from "./types";

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/user/");
    dispatch(
      generateModifyStateAction({
        isLoading: false,
        users: data,
        showSnackbar: true,
        snackbarMessage: "All users fetched",
      })
    );
  } catch (err) {
    dispatchError(err, dispatch);
  }
};

export const getCurrentUserInfo = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/user/getCurrentUserInfo");
    data.profileImage = axios.defaults.baseURL + data.profileImage;
    dispatch(
      generateModifyStateAction({
        isLoading: false,
        currentUserInfo: data,
        showSnackbar: true,
        snackbarMessage: "User  info fetched",
      })
    );
  } catch (err) {
    dispatchError(err, dispatch);
  }
};

export const followUser = (followingId) => async (dispatch) => {
  try {
    const { data } = await axios.put("/user/following", {
      followingId: followingId,
    });
    dispatch({ type: actionTypes.PUT_FOLLOW, userId: followingId });
    getPosts()(dispatch);
  } catch (err) {
    dispatchError(err, dispatch);
  }
};

export const unfollowUser = (followingId) => async (dispatch) => {
  try {
    const { data } = await axios.delete("/user/following", {
      data: { followingId: followingId },
    });
    dispatch({ type: actionTypes.DELETE_FOLLOW, userId: followingId });
    getPosts()(dispatch);
  } catch (err) {
    dispatchError(err, dispatch);
  }
};

export default {
  getUsers,
  getCurrentUserInfo,
  followUser,
  unfollowUser,
};
