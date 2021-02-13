import React, { Component } from "react";
import PostCard from "../../components/post-card/post-card";
import AddPost from "../../components/add-post/add-post";
import { connect } from "react-redux";
import postActions from "../../actions/post-actions";
import commentActions from "../../actions/comment-actions";
import { followUser, unfollowUser } from "../../actions/user-actions";
import classes from "./home.module.css";
import axios from "../../axiosInstance";
import { Avatar } from "@material-ui/core";

class Home extends Component {
  componentDidMount() {
    if (!this.props.postsData || this.props.postsData.length === 0) {
      this.props.getPosts();
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col col-sm-12 col-lg-8">
            <div className="w-75 m-auto">
              <AddPost addPost={this.props.addPost} />
            </div>
            <br />
            <br />

            <div className="px-1 py-2 w-75 m-auto">
              {this.props.postsData !== undefined &&
                this.props.postsData.map((postData) => {
                  return (
                    <React.Fragment key={postData.post._id}>
                      <PostCard
                        post={{ ...postData.post }}
                        comments={[...postData.comments]}
                        addComment={this.props.addComment}
                        changePostLike={this.props.changePostLike}
                        onDelete={this.props.deletePost}
                        onEdit={this.props.editPost}
                        onCommentDelete={this.props.deleteComment}
                      />
                      <br />
                      <br />
                    </React.Fragment>
                  );
                })}
            </div>
          </div>
          <div className={`col col-md-4 d-sm-none d-lg-block py-5`}>
            <div className={`${classes.sidenav}`}>
              <h4 className="text-center">Connect with others!</h4>
              {this.props.users !== undefined &&
              this.props.currentUserInfo !== undefined
                ? this.props.users.map((option) =>
                    option._id != this.props.currentUserInfo._id ? (
                      <div key={`${option._id}`} className={`${classes.users}`}>
                        <div
                          className={`${classes.userImgNameWrapper}`}
                          onClick={() =>
                            this.props.history.push(`/profile/${option._id}`)
                          }
                        >
                          <span className="pr-2">
                            <Avatar
                              alt={
                                option.firstName[0].toUpperCase() +
                                option.lastName[0].toUpperCase()
                              }
                              src={axios.defaults.baseURL + option.profileImage}
                            />
                          </span>
                          {option.firstName + " " + option.lastName}
                        </div>
                        <span className="ml-auto">
                          <button
                            onClick={
                              option.isFollowing
                                ? () => this.props.unfollowUser(option._id)
                                : () => this.props.followUser(option._id)
                            }
                          >
                            {option.isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </span>
                      </div>
                    ) : null
                  )
                : "bello"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    currentUserInfo: state.currentUserInfo,
    showSnackbar: state.showSnackbar,
    snackbarMessage: state.snackbarMessage,
    postsData: state.postsData,
    users: state.users,
  };
};

const mapDispatchToProps = {
  ...postActions,
  ...commentActions,
  followUser,
  unfollowUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
