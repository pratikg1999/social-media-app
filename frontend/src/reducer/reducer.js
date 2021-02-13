import { Satellite } from "@material-ui/icons";
import * as actionTypes from "../actions/types";

const initialState = {
  isLoading: true,
  showSnackbar: false,
  snackbarMessage: "",
  postsData: [],
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODIFY_STATE:
      return { ...state, ...action.newState };
    case actionTypes.CLEAR_STATE:
      return initialState;
    case actionTypes.ADD_POST:
      state.postsData.unshift({ post: action.newPost, comments: [] });
      return { ...state, postsData: [...state.postsData] };
    case actionTypes.DELETE_POST:
      state.postsData.splice(
        state.postsData.findIndex((e) => e.post._id === action.postId),
        1
      );
      return { ...state, postsData: [...state.postsData] };
    case actionTypes.EDIT_POST:
      state.postsData.find((e) => e.post._id === action.postId).post =
        action.updatedPost;
      return { ...state, postsData: [...state.postsData] };
    case actionTypes.ADD_COMMENT:
      state.postsData
        .find((e) => e.post._id === action.comment.post)
        .comments.unshift(action.comment);
      return { ...state, postsData: [...state.postsData] };
    case actionTypes.DELETE_COMMENT:
      let post = state.postsData.find((e) => e.post._id === action.postId);
      post.comments.splice(
        post.comments.findIndex((e) => e._id === action.commentId),
        1
      );
      return { ...state, postsData: [...state.postsData] };
    case actionTypes.UPDATE_LIKES:
      state.postsData.find((e) => e.post._id === action.postId).post.likes =
        action.likes;
      return { ...state, postsData: [...state.postsData] };
    case actionTypes.PUT_FOLLOW:
      state.users.find((e) => e._id === action.userId).isFollowing = true;
      return { ...state, users: [...state.users] };
    case actionTypes.DELETE_FOLLOW:
      state.users.find((e) => e._id === action.userId).isFollowing = false;
      return { ...state, users: [...state.users] };
    default:
      return state;
  }
};

export default reducer;
