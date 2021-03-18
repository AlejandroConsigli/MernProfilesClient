import React, { lazy, memo, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../actions/auth";

const PublicRoute = lazy(() => import("./PublicRoute"));
const Landing = lazy(() => import("../components/pages/Landing/Landing"));
const Signin = lazy(() => import("../components/pages/Signin/Signin"));
const Signup = lazy(() => import("../components/pages/Signup/Signup"));
const Forgot = lazy(() => import("../components/pages/Forgot/Forgot"));
const Reset = lazy(() => import("../components/pages/Reset/Reset"));
const Activate = lazy(() => import("../components/pages/Activate/Activate"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const Profiles = lazy(() => import("../components/pages/Profiles/Profiles"));
const User = lazy(() => import("../components/pages/User/User"));
const Password = lazy(() => import("../components/pages/Password/Password"));
const Profile = lazy(() => import("../components/pages/Profile/Profile"));
const Myprofile = lazy(() => import("../components/pages/Myprofile/Myprofile"));
const Notfound = lazy(() => import("../components/pages/Notfound/Notfound"));

const Routes = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        dispatch(auth());
    }, [dispatch]);

    useEffect(() => {
        document.title = capitalizeFirstLetter(location.pathname.replace(/\\|\//g,''));
    }, [location])
    
    return (
        <Switch>
            <PublicRoute exact path="/" component={Landing} />
            <PublicRoute exact path="/signin" component={Signin} />
            <PublicRoute exact path="/signup" component={Signup} />
            <PublicRoute exact path="/forgot" component={Forgot} />
            <PublicRoute exact path="/reset/:token" component={Reset} />
            <PublicRoute exact path="/activate/:token" component={Activate} />
            <PrivateRoute exact path="/user" component={User} />
            <PrivateRoute exact path="/password" component={Password} />
            <PrivateRoute exact path="/profiles" component={Profiles} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/myprofile" component={Myprofile} />
            <Route component={Notfound} />
        </Switch>
    );
};

export default memo(Routes);
