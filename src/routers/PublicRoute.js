import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({ isLogin, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      !isLogin ? <Component {...props} /> : <Redirect to="/home" />
    }
  />
);

const mapStateToProps = state => ({
  isLogin: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
