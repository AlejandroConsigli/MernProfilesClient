import React, { memo, useEffect } from "react";
import styles from "./activate.module.scss";
import { useDispatch } from "react-redux";
import { activate } from "../../../actions/auth";
import isJwtValid from "is-jwt-valid";
import { useHistory } from "react-router";

const Signup = ({ match: { params } }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const auxToken = params.token;
        if(isJwtValid(auxToken)) {
            dispatch(activate(auxToken));
        } else {
            history.push("/");
        }
    }, [dispatch, params.token, history]);

    return (
        <div className={styles.container}>
            <div className={styles.content}></div>
        </div>
    );
};

export default memo(Signup);
