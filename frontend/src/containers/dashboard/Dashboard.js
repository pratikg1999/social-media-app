import React, { Component } from "react";
import axios from "../../axiosInstance";
import { withStyles, withTheme } from "@material-ui/core/styles";
import {
  TextField,
  Typography,
  AppBar,
  Toolbar,
  MenuItem,
  Menu,
  IconButton,
  Backdrop,
  CircularProgress,
  Snackbar,
  Avatar,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AccountCircle, Search } from "@material-ui/icons";
import { Switch, Route } from "react-router-dom";
import ProfilePage from "../profile/ProfilePage";
import Home from "../home/home";
import { connect } from "react-redux";
import commonActions from "../../actions/common-actions";
import userActions from "../../actions/user-actions";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const styles = (theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      marginRight: "auto",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  };
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    axios.defaults.headers["x-access-token"] =
      window.localStorage["x-access-token"];
  }

  handleMenu = (event) => {
    // console.log("opening menu ", event.currentTarget);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState((prevState, props) => {
      return { anchorEl: null };
    });
  };

  state = {
    autoUser: null,
    anchorEl: null,
  };

  searchUser = (e) => {
    console.log("searching user");
    if (this.state.autoUser != null) {
      this.props.history.push(`/profile/${this.state.autoUser._id}`);
    }
  };

  componentDidMount() {
    if (!window.localStorage["x-access-token"]) {
      this.props.modifyState({
        isLoading: false,
        showSnackbar: true,
        snackbarMessage: "You need to login first",
      });
      this.props.history.push("/");
    }
    this.props.getUsers();
    this.props.getCurrentUserInfo();
  }

  logout = () => {
    window.localStorage.removeItem("x-access-token");
    this.props.clearState();
    this.props.history.push("/");
  };

  render() {
    const classes = this.props.classes;
    return (
      <>
        {this.props.isLoading && (
          <Backdrop className={classes.backdrop} open={this.props.isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              className={classes.title}
              onClick={() => {
                this.props.history.push("/home");
              }}
              style={{ cursor: "pointer" }}
            >
              Social-media
            </Typography>
            {this.props.users !== undefined && (
              <>
                <Autocomplete
                  value={this.state.autoUser}
                  onChange={(event, newValue) => {
                    this.setState({ autoUser: newValue });
                  }}
                  id="find-users"
                  style={{ width: 300 }}
                  options={this.props.users}
                  autoHighlight
                  getOptionLabel={(option) =>
                    option.firstName + " " + option.lastName
                  }
                  renderOption={(option) => (
                    <React.Fragment>
                      <span className="pr-1">
                        <Avatar
                          alt={
                            option.firstName[0].toUpperCase() +
                            option.lastName[0].toUpperCase()
                          }
                          src={axios.defaults.baseURL + option.profileImage}
                        />
                      </span>
                      {option.firstName + " " + option.lastName}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ backgroundColor: "#ffffff25" }}
                      className="p-1"
                      placeholder="Find a user"
                      inputProps={{
                        style: { color: "white" },
                        ...params.inputProps,
                        className: "px-1",
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
                <IconButton onClick={this.searchUser}>
                  <Search />
                </IconButton>
              </>
            )}
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                {this.props.currentUserInfo !== undefined ? (
                  <Avatar
                    alt={
                      this.props.currentUserInfo.firstName[0].toUpperCase() +
                      this.props.currentUserInfo.lastName[0].toUpperCase()
                    }
                    src={this.props.currentUserInfo.profileImage}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={this.state.anchorEl ? true : false}
                onClose={this.handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    this.props.history.push(
                      `/profile/${this.props.currentUserInfo._id}`
                    );
                    this.handleMenuClose();
                  }}
                >
                  My profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    this.props.history.push("/profile");
                    this.handleMenuClose();
                  }}
                >
                  Edit account
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    this.logout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <div id="content">
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/profile/:userId" component={ProfilePage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
        {this.props.showSnackbar && (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={this.props.showSnackbar}
            autoHideDuration={2000}
            onClose={() => this.props.modifyState({ showSnackbar: false })}
            message={this.props.snackbarMessage}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    currentUserInfo: state.currentUserInfo,
    showSnackbar: state.showSnackbar,
    snackbarMessage: state.snackbarMessage,
    users: state.users,
  };
};

const mapDispatchToProps = {
  ...userActions,
  ...commonActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(withStyles(styles, { withTheme: true })(Dashboard)));
