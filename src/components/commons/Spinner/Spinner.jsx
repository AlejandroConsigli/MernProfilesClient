import React, { memo } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./spinner.module.scss";

export default memo(() => (
    <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.spinner}>
                <CircularProgress classes={{ colorPrimary: styles.color }} />
            </div>
        </div>
    </div>
));
