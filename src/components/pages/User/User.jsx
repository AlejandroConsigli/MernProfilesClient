import React, { memo, useState, useEffect } from "react";
import styles from "./user.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { editUser, deleteUser } from "../../../actions/user";
import Dots from "../../commons/Dots/Dots";

const User = () => {
    const { t } = useTranslation(["user", "alert"]);
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);

    const [credentials, setCredentials] = useState({
        email: "",
        name: "",
        lastname: "",
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
        if (!credentials.name || !credentials.lastname) {
            dispatch(setAlert(t("alert:missing_required_fields"), "warning"));
        } else {
            dispatch(editUser(credentials.name, credentials.lastname));
        }
    };

    const onDelete = () => {
        dispatch(deleteUser());
    };

    useEffect(() => {
        userState.user && setCredentials(userState.user);
    }, [userState]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.card}>
                        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
                            <div className={styles.groupitem}>
                                <label htmlFor="email" className={styles.label}>
                                    {t("email")}
                                </label>
                                {!userState.loading ? (
                                    <input
                                        name="email"
                                        id="email"
                                        placeholder={t("email")}
                                        type="text"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        className={styles.input}
                                        readOnly
                                        maxLength="30"
                                    />
                                ) : (
                                    <Dots />
                                )}
                            </div>
                            <div className={styles.groupitem}></div>
                            <div className={styles.groupitem}>
                                <label htmlFor="name" className={styles.label}>
                                    {t("name")} *
                                </label>
                                {!userState.loading ? (
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
                                ) : (
                                    <Dots />
                                )}
                            </div>
                            <div className={styles.groupitem}>
                                <label htmlFor="lastname" className={styles.label}>
                                    {t("lastname")} *
                                </label>
                                {!userState.loading ? (
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
                                ) : (
                                    <Dots />
                                )}
                            </div>
                            <div className={styles.buttons}>
                                <input
                                    type="button"
                                    value={t("delete")}
                                    className={styles.delete}
                                    onClick={onDelete}
                                />
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

export default memo(User);
