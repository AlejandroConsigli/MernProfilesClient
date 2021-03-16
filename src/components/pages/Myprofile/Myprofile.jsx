import React, { memo, useState, useEffect, useRef } from "react";
import styles from "./myprofile.module.scss";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { createEditProfile, deleteProfile } from "../../../actions/profiles";
import Dots from "../../commons/Dots/Dots";
import { profileDefaultImage } from "../../../shared/utils/conf";

const Myprofile = () => {
    const { t } = useTranslation(["myprofile", "alert"]);
    const dispatch = useDispatch();
    const profilesState = useSelector((state) => state.profiles);
    const history = useHistory();

    const [profile, setProfile] = useState({
        age: "",
        gender: "",
        height: "",
        weight: "",
        image: profileDefaultImage,
    });

    const [formData, setFormData] = useState("");
    const inputImage = useRef("");

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if(type === "number" && value.length > 3) {
            return;
        }
        setProfile((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const onSubmit = (e = "") => {
        e && e.preventDefault();
        if (!profile.age || !profile.gender) {
            dispatch(setAlert(t("alert:missing_required_fields"), "warning"));
        } else if (profile.age < 1 || profile.age > 120) {
            dispatch(setAlert(t("alert:non_valid_age"), "warning"));
        } else {
            dispatch(
                createEditProfile(
                    profile._id,
                    profile.age,
                    profile.gender,
                    profile.height,
                    profile.weight,
                    profile.image,
                    formData
                )
            );
            setFormData("");
        }
    };

    const onDelete = () => {
        dispatch(deleteProfile(history));
    };

    const uploadImage = ({ target: { files } }) => {
        let data = new FormData();
        data.append("image", files[0]);
        setFormData(data);
        setProfile((prevState) => {
            return {
                ...prevState,
                image: URL.createObjectURL(files[0]),
            };
        });
    };

    const clearImage = () => {
        inputImage.current.value = "";
        setProfile((prevState) => {
            return {
                ...prevState,
                image: profileDefaultImage,
            };
        });
    };

    useEffect(() => {
        profilesState.myProfile && setProfile(profilesState.myProfile);
    }, [profilesState]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.card}>
                        {!profilesState.myLoading ? (
                            <>
                                <div className={styles.box}>
                                    <label htmlFor="upload">
                                        <img
                                            className={styles.image}
                                            src={profile.image}
                                            alt={profile.image}
                                        />
                                    </label>
                                    {profile.image !== profileDefaultImage && (
                                        <span className={styles.cross} onClick={clearImage}>
                                            X
                                        </span>
                                    )}
                                </div>
                                <label className={styles.imagetext}>{t("image_text")}</label>
                                <input
                                    className={styles.upload}
                                    type="file"
                                    id="upload"
                                    name="upload"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={uploadImage}
                                    ref={inputImage}
                                />
                            </>
                        ) : (
                            <div className={styles.imageDots}>
                                <Dots />
                            </div>
                        )}
                        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
                            <div className={styles.groupitem}>
                                <label htmlFor="age" className={styles.label}>
                                    {t("age")} *
                                </label>
                                {!profilesState.myLoading ? (
                                    <input
                                        name="age"
                                        id="age"
                                        placeholder={t("age")}
                                        type="number"
                                        value={profile.age || ""}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                ) : (
                                    <Dots />
                                )}
                            </div>
                            <div className={styles.groupitem}>
                                <label htmlFor="gender" className={styles.label}>
                                    {t("gender")} *
                                </label>
                                {!profilesState.myLoading ? (
                                    <div className={styles.gender}>
                                        <input
                                            type="radio"
                                            value="F"
                                            checked={profile.gender === "F"}
                                            name="gender"
                                            id="female"
                                            onChange={handleChange}
                                            className={styles.radio}
                                        />
                                        <label className={styles.text} htmlFor="female">
                                            {t("female")}
                                        </label>
                                        <input
                                            type="radio"
                                            value="M"
                                            checked={profile.gender === "M"}
                                            name="gender"
                                            id="male"
                                            onChange={handleChange}
                                            className={styles.radio}
                                        />
                                        <label className={styles.text} htmlFor="male">
                                            {t("male")}
                                        </label>
                                    </div>
                                ) : (
                                    <Dots />
                                )}
                            </div>
                            <div className={styles.groupitem}>
                                <label htmlFor="height" className={styles.label}>
                                    {t("height")} (cm)
                                </label>
                                {!profilesState.myLoading ? (
                                    <input
                                        name="height"
                                        id="height"
                                        placeholder={t("height")}
                                        type="number"
                                        step="any"
                                        value={profile.height || ""}
                                        onChange={handleChange}
                                        className={styles.input}
                                        maxLength="3"
                                    />
                                ) : (
                                    <Dots />
                                )}
                            </div>
                            <div className={styles.groupitem}>
                                <label htmlFor="weight" className={styles.label}>
                                    {t("weight")} (kg)
                                </label>
                                {!profilesState.myLoading ? (
                                    <input
                                        name="weight"
                                        id="weight"
                                        placeholder={t("weight")}
                                        type="number"
                                        step="any"
                                        value={profile.weight || ""}
                                        onChange={handleChange}
                                        className={styles.input}
                                        maxLength="3"
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
                                    disabled={!profilesState.myProfile}
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

export default memo(Myprofile);
