import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./signin.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { signin } from "../../../actions/auth";
import Dots from "../../commons/Dots/Dots";

const Signin = () => {
    const { t } = useTranslation(["signin", "alert"]);
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
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
        if (!credentials.email || !credentials.password) {
            dispatch(setAlert(t("alert:missing_required_fields"), "warning"));
        } else if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                credentials.email
            )
        ) {
            dispatch(setAlert(t("alert:non_valid_email"), "warning"));
        } else if (credentials.password.length < 6) {
            dispatch(setAlert(t("alert:minimun_password"), "warning"));
        } else {
            dispatch(signin(credentials.email, credentials.password));
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
                                {t("email")}
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
                            {!authState.loading ? (
                                <div className={styles.buttons}>
                                    <input
                                        type="submit"
                                        value={t("title")}
                                        className={styles.submit}
                                    />
                                    <span className={styles.forgot}>
                                        <Link to="/forgot">{t("forgot")}</Link>
                                    </span>
                                </div>
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

export default memo(Signin);
