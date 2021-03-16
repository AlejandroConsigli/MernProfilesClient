import React, { memo, useState } from "react";
import styles from "./password.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { editPassword } from "../../../actions/user";
import Dots from "../../commons/Dots/Dots";

const Password = () => {
    const { t } = useTranslation(["user", "alert"]);
    const dispatch = useDispatch();
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
            dispatch(editPassword(credentials.password));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.card}>
                        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
                            <div className={styles.groupitem}>
                                <label htmlFor="password" className={styles.label}>
                                    {t("password")} *
                                </label>
                                {!userState.loading ? (
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
                                ) : (
                                    <Dots />
                                )}
                            </div>
                            <div className={styles.groupitem}>
                                <label htmlFor="passwordRepeat" className={styles.label}>
                                    {t("password_repeat")} *
                                </label>
                                {!userState.loading ? (
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
                                ) : (
                                    <Dots />
                                )}
                            </div>
                            <div className={styles.buttons}>
                                <input
                                    type="submit"
                                    value={t("accept")}
                                    className={styles.submit}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Password);
