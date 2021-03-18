import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/auth";
import Dots from "../../commons/Dots/Dots";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const Navbar = () => {
    const { t } = useTranslation("routes");
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);

    const [menu, setMenu] = useState(false);

    const toggleMenu = (open) => (e) => {
        if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
            return;
        }

        setMenu(open);
    };

    return (
        <div className={styles.topbar}>
            <div className={styles.container}>
                <div className={styles.content}>
                        <div className={`${styles.links} ${styles.linksDesktop}`}>
                            <div className={styles.grouplinks}>
                                <span className={styles.link}>
                                    {!userState.loading ? (
                                        <Link to="/myprofile">
                                            {userState.user &&
                                                `${userState.user.name} ${userState.user.lastname}`}
                                        </Link>
                                    ) : (
                                        <Dots />
                                    )}
                                </span>
                                <span className={styles.link}>
                                    <Link to="/profiles">{t("profiles")}</Link>
                                </span>
                            </div>
                            <div className={styles.grouplinks}>
                                <span className={styles.link}>
                                    <Link to="/user">{t("user")}</Link>
                                </span>
                                <span className={styles.link}>
                                    <Link to="/password">{t("password")}</Link>
                                </span>
                                <span className={styles.link} onClick={() => dispatch(logout())}>
                                    {t("signout")}
                                </span>
                            </div>
                        </div>
                        <div className={`${styles.links} ${styles.linksMobile}`}>
                            <div className={styles.grouplinks}>
                                <span className={styles.linkOpen} onClick={toggleMenu(true)}>
                                    {t("menu")}
                                </span>
                            </div>
                        </div>
                        <SwipeableDrawer
                            classes={{ paper: `${styles.linksOpen} ${styles.linksMobile}`  }}
                            open={menu}
                            onClose={toggleMenu(false)}
                            onOpen={toggleMenu(true)}
                        >
                            <div
                                className={styles.grouplinks}
                                role="presentation"
                                onClick={toggleMenu(false)}
                                onKeyDown={toggleMenu(false)}
                            >
                                <span className={styles.link}>
                                    {!userState.loading ? (
                                        <Link to="/myprofile">
                                            {userState.user &&
                                                `${userState.user.name} ${userState.user.lastname}`}
                                        </Link>
                                    ) : (
                                        <Dots />
                                    )}
                                </span>
                                <span className={styles.link}>
                                    <Link to="/profiles">{t("profiles")}</Link>
                                </span>
                                <span className={styles.link}>
                                    <Link to="/user">{t("user")}</Link>
                                </span>
                                <span className={styles.link}>
                                    <Link to="/password">{t("password")}</Link>
                                </span>
                                <span className={styles.link} onClick={() => dispatch(logout())}>
                                    {t("signout")}
                                </span>
                            </div>
                        </SwipeableDrawer>
                </div>
            </div>
        </div>
    );
};

export default memo(Navbar);
