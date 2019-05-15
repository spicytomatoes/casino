import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

export const PrivateRoute = ({ isLogin, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isLogin ? (
        <div>
          <Header />
          <div className="content-container">
            <div className="box">
              <Component {...props} />
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = state => ({
  isLogin: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
