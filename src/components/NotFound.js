import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div>
    ERROR 404. PAGE NOT FOUND
    <br />
    <Link to="/">Retrun to Home Page</Link>
  </div>
);

export default NotFoundPage;
