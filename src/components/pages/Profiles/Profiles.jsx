import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./profiles.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../../actions/profiles";
import Dots from "../../commons/Dots/Dots";
import { profileDefaultImage } from "../../../shared/utils/conf";

const Profiles = () => {
    const { t } = useTranslation("profiles");
    const dispatch = useDispatch();
    const profilesState = useSelector((state) => state.profiles);

    const [profiles, setProfiles] = useState([]);
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        const { value } = e.target;
        setSearch(value);
    };
    
    useEffect(() => {
        dispatch(getProfiles(search));
    }, [dispatch, search]);

    useEffect(() => {
        profilesState.profiles && setProfiles(profilesState.profiles);
    }, [profilesState]);

    const checkTextLength = (text, length = 100) => {
        return text.length > length
            ? `${text.substring(0, length)}...`
            : text || "-";
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.groupitem}>
                        <input
                            name="search"
                            id="search"
                            placeholder={t("search")}
                            value={search}
                            onChange={handleChange}
                            className={styles.input}
                            maxLength="20"
                        />
                    </div>
                    <div className={styles.groupSpaces}>
                        {!profilesState.loading ? (
                            profilesState.profiles.length > 0 ? (
                                profiles.map(({ _id, userData, age, image }) => (
                                    <div className={styles.space} key={userData._id}>
                                        <Link to={`/profile/${userData._id}`}>
                                            <div className={styles.card}>
                                                <img
                                                    className={styles.image}
                                                    src={image || profileDefaultImage}
                                                    alt={image}
                                                />
                                                <div className={styles.data}>
                                                    <span className={styles.item}>
                                                        {checkTextLength(userData.name)} {checkTextLength(userData.lastname)}
                                                    </span>
                                                    <span className={styles.item}>
                                                        {age} {t("years")}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <span className={styles.empty}>{t("no_profiles")}</span>
                            )
                        ) : (
                            <Dots />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Profiles);
