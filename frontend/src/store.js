import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer/reducer";

const initialState = {
  isLoading: true,
  showSnackbar: false,
  snackbarMessage: "",
  postsData: [],
  users: [],
};

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
