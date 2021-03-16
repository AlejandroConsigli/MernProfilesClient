import React, { memo } from "react";
import { Link } from "react-router-dom";
import styles from "./landing.module.scss";
import { useTranslation } from "react-i18next";

const Landing = () => {
    const { t } = useTranslation("landing");

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.card}>
                        <span className={styles.title}>{t("title")}</span>
                        <div className={styles.links}>
                            <span className={styles.signin}>
                                <Link to="/signin">{t("signin")}</Link>
                            </span>
                            <span className={styles.signup}>
                                <Link to="/signup">{t("signup")}</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Landing);
