import React, { memo, useState, useEffect } from "react";
import styles from "./profile.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../actions/profiles";
import Dots from "../../commons/Dots/Dots";
import { profileDefaultImage } from "../../../shared/utils/conf";

const Profile = ({ match: { params } }) => {
    const { t } = useTranslation("profile");
    const dispatch = useDispatch();
    const profilesState = useSelector((state) => state.profiles);

    const [profile, setProfile] = useState({
        userData: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
    });

    const getGender = (gender) => {
        if (gender === "F") {
            return "female";
        } else if (gender === "M") {
            return "male";
        }
    };

    useEffect(() => {
        dispatch(getProfile(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        profilesState.profile && setProfile(profilesState.profile);
    }, [profilesState]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.space}>
                        <div className={styles.card}>
                            {!profilesState.loading ? (
                                <img
                                    className={styles.image}
                                    src={profile.image || profileDefaultImage}
                                    alt={profile.image}
                                />
                            ) : (
                                <div className={styles.imageDots}>
                                    <Dots />
                                </div>
                            )}
                            <div className={styles.data}>
                                {!profilesState.loading ? (
                                    <span className={styles.name}>
                                        {profile.userData.name} {profile.userData.lastname}
                                    </span>
                                ) : (
                                    <div className={styles.dots}>
                                        <Dots />
                                    </div>
                                )}
                                <div className={styles.groupitem}>
                                    {!profilesState.loading ? (
                                        <>
                                            <span className={styles.item}>
                                                {t("age")} : {profile.age} {t("years")}
                                            </span>
                                            <span className={styles.item}>
                                                {t("gender")}: {t(getGender(profile.gender))}
                                            </span>
                                            {profile.height && (
                                                <span className={styles.item}>
                                                    {t("height")}: {profile.height} cm
                                                </span>
                                            )}
                                            {profile.weight && (
                                                <span className={styles.item}>
                                                    {t("weight")}: {profile.weight} kg
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        <div className={styles.dots}>
                                            <Dots />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Profile);
