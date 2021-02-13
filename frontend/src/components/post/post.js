import React from "react";
import { CardContent, CardMedia } from "@material-ui/core";
import classes from "./post.module.css";
import axios from "../../axiosInstance";
const Post = (props) => {
  return (
    <>
      {props.image && (
        <CardMedia>
          <img
            className={classes.postImage}
            src={axios.defaults.baseURL + props.image}
            alt="post-media"
          />
        </CardMedia>
      )}
      {props.body && (
        <CardContent>
          <div className={classes.postBody}>{props.body}</div>
        </CardContent>
      )}
    </>
  );
};

export default Post;
