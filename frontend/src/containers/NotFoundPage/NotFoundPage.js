import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = (props) => {
  return (
    <div className="row text-center">
      <div className="col col-sm-12">
        <h1 className="color-primary">404</h1>
        <h6>Page not found</h6>
        <Link to="/home">Go to Home </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
