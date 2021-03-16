import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./signup.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { signup } from "../../../actions/auth";
import Dots from "../../commons/Dots/Dots";

const Signup = () => {
    const { t } = useTranslation(["signup", "alert"]);
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    const [credentials, setCredentials] = useState({
        email: "",
        name: "",
        lastname: "",
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
        if (
            !credentials.email ||
            !credentials.name ||
            !credentials.lastname ||
            !credentials.password
        ) {
            dispatch(setAlert(t("alert:missing_required_fields"), "warning"));
        } else if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                credentials.email
            )
        ) {
            dispatch(setAlert(t("alert:non_valid_email"), "warning"));
        } else if (credentials.password.length < 6) {
            dispatch(setAlert(t("alert:minimun_password"), "warning"));
        } else if (credentials.password !== credentials.passwordRepeat) {
            dispatch(setAlert(t("alert:non_equal_passwords"), "warning"));
        } else {
            dispatch(
                signup(
                    credentials.email,
                    credentials.name,
                    credentials.lastname,
                    credentials.password
                )
            );
        }
    };

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
                            <label htmlFor="email" className={styles.label}>
                                {t("email")} *
                            </label>
                            <input
                                name="email"
                                id="email"
                                placeholder={t("email")}
                                type="text"
                                value={credentials.email}
                                onChange={handleChange}
                                className={styles.input}
                                maxLength="30"
                            />
                            <label htmlFor="name" className={styles.label}>
                                {t("name")} *
                            </label>
                            <input
                                name="name"
                                id="name"
                                placeholder={t("name")}
                                type="text"
                                value={credentials.name}
                                onChange={handleChange}
                                className={styles.input}
                                maxLength="20"
                            />
                            <label htmlFor="lastname" className={styles.label}>
                                {t("lastname")} *
                            </label>
                            <input
                                name="lastname"
                                id="lastname"
                                placeholder={t("lastname")}
                                type="text"
                                value={credentials.lastname}
                                onChange={handleChange}
                                className={styles.input}
                                maxLength="20"
                            />
                            <label htmlFor="password" className={styles.label}>
                                {t("password")} *
                            </label>
                            <input
                                name="password"
                                id="password"
                                placeholder={t("password")}
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                className={styles.input}
                                autoComplete="new-password"
                                maxLength="20"
                            />
                            <label htmlFor="passwordRepeat" className={styles.label}>
                                {t("password_repeat")} *
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
                            {!authState.loading ? (
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

export default memo(Signup);
