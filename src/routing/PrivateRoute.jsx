import React, { memo, lazy } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = lazy(() => import("../components/commons/Nabvbar/Navbar"));

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authStates = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={(props) =>
                !authStates.authenticated && !authStates.loading ? (
                    <Redirect to="/" />
                ) : (
                    <>
                        <Navbar />
                        <Component {...props} />
                    </>
                )
            }
        />
    );
};

export default memo(PrivateRoute);
