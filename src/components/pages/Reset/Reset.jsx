import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./reset.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { editPassword } from "../../../actions/user";
import Dots from "../../commons/Dots/Dots";
import isJwtValid from "is-jwt-valid";
import { useHistory } from "react-router";
import setAuthToken from "../../../shared/utils/setAuthToken";
import { USER_FAIL } from "../../../actions/user";

const Reset = ({ match: { params } }) => {
    const { t } = useTranslation(["reset", "alert"]);
    const dispatch = useDispatch();
    const history = useHistory();
    const userState = useSelector((state) => state.user);

    const [credentials, setCredentials] = useState({
        password: "",
        passwordRepeat: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!credentials.password) {
            dispatch(setAlert(t("alert:missing_required_fields"), "warning"));
        } else if (credentials.password.length < 6) {
            dispatch(setAlert(t("alert:minimun_password"), "warning"));
        } else if (credentials.password !== credentials.passwordRepeat) {
            dispatch(setAlert(t("alert:non_equal_passwords"), "warning"));
        } else {
            dispatch(editPassword(credentials.password, history));
        }
    };

    useEffect(() => {
        const auxToken = params.token;
        if (isJwtValid(auxToken)) {
            setAuthToken(auxToken);
        } else {
            history.push("/");
        }
    }, [dispatch, params.token, history]);

    useEffect(() => {
        dispatch({
            type: USER_FAIL,
        });
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.card}>
                        <div className={styles.links}>
                            <span className={styles.return}>
                                <Link to="/">
                                    <i className="fas fa-arrow-left"></i>
                                </Link>
                            </span>
                        </div>
                        <span className={styles.title}>{t("title")}</span>
                        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
                            <label htmlFor="password" className={styles.label}>
                                {t("password")}
                            </label>
                            <input
                                name="password"
                                id="password"
                                placeholder={t("password")}
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                className={styles.input}
                                maxLength="20"
                            />
                            <label htmlFor="passwordRepeat" className={styles.label}>
                                {t("password_repeat")}
                            </label>
                            <input
                                name="passwordRepeat"
                                id="passwordRepeat"
                                placeholder={t("password_repeat")}
                                type="password"
                                value={credentials.passwordRepeat}
                                onChange={handleChange}
                                className={styles.input}
                                maxLength="20"
                            />
                            {!userState.loading ? (
                                <input type="submit" value={t("title")} className={styles.submit} />
                            ) : (
                                <div className={styles.dots}>
                                    <Dots />
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Reset);
