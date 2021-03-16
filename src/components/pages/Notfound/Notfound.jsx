import React, { memo } from "react";
import styles from "./notfound.module.scss";
import { useTranslation } from "react-i18next";

const Notfound = () => {
    const { t } = useTranslation("notfound");

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.card}>
                        <span className={styles.title}>{t("title")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Notfound);
