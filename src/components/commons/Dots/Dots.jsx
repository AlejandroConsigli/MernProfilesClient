import React from "react";
import styles from "./dots.module.scss";
import Loader from "react-loader-spinner";

const Dots = () => {
    return <Loader type="ThreeDots" className={styles.dots} />;
};

export default Dots;
