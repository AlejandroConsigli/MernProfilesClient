import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./forgot.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { forgot } from "../../../actions/auth";
import Dots from "../../commons/Dots/Dots";

const Forgot = () => {
    const { t } = useTranslation(["forgot", "alert"]);
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    const [credentials, setCredentials] = useState({
        email: "",
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
        if (!credentials.email) {
            dispatch(setAlert(t("alert:missing_required_fields"), "warning"));
        } else if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                credentials.email
            )
        ) {
            dispatch(setAlert(t("alert:non_valid_email"), "warning"));
        } else {
            dispatch(forgot(credentials.email));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.card}>
                        <div className={styles.links}>
                            <span className={styles.return}>
                                <Link to="/signin">
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

export default memo(Forgot);
