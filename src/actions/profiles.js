import axios from "axios";
import { headers } from "../shared/utils/conf";
import { setAlert } from "./alert";
import i18n from "../i18next";

export const LOADING_MY_PROFILE = "LOADING_MY_PROFILE";
export const LOADING_PROFILE = "LOADING_PROFILE";
export const SET_PROFILE = "SET_PROFILE";
export const SET_MY_PROFILE = "SET_MY_PROFILE";
export const SET_PROFILES = "SET_PROFILES";
export const CREATE_PROFILE = "CREATE_PROFILE";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const DELETE_PROFILE = "DELETE_PROFILE";
export const MY_PROFILE_FAIL = "MY_PROFILE_FAIL";
export const PROFILE_FAIL = "PROFILE_FAIL";

export const getMyProfile = () => async (dispatch) => {
    dispatch({
        type: LOADING_MY_PROFILE,
    });

    try {
        const res = await axios.get("/api/profiles/me", { headers });

        dispatch({
            type: SET_MY_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        if (err.response && err.response.status !== 404) {
            dispatch(setAlert(i18n.t("alert:server_error"), "error"));
        }

        dispatch({
            type: MY_PROFILE_FAIL,
        });
    }
};

export const getProfile = (id) => async (dispatch) => {
    dispatch({
        type: SET_PROFILE,
        payload: null,
    });
    dispatch({
        type: LOADING_PROFILE,
    });

    try {
        const res = await axios.get(`/api/profiles/user/${id}`, { headers });

        dispatch({
            type: SET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        if (err.response && err.response.status !== 404) {
            dispatch(setAlert(i18n.t("alert:server_error"), "error"));
        }

        dispatch({
            type: PROFILE_FAIL,
        });
    }
};

export const getProfiles = (search) => async (dispatch) => {
    dispatch({
        type: SET_PROFILES,
        payload: [],
    });
    dispatch({
        type: LOADING_PROFILE,
    });

    const query = search ? `?search=${search}` : "";

    try {
        const res = await axios.get(`/api/profiles${query}`, { headers });

        dispatch({
            type: SET_PROFILES,
            payload: res.data,
        });
    } catch (err) {
        dispatch(setAlert(i18n.t("alert:server_error"), "error"));
        dispatch({
            type: PROFILE_FAIL,
        });
    }
};

export const createEditProfile = (id, age, gender, height, weight, image, formData) => async (
    dispatch
) => {
    dispatch({
        type: LOADING_MY_PROFILE,
    });

    try {
        if (formData) {
            const res = await axios.post(`/api/files/${id}`, formData, { headers });
            image = res.data;
        }

        const body = JSON.stringify({ age, gender, height, weight, image });

        if (!id) {
            const res = await axios.post("/api/profiles", body, { headers });

            dispatch(setAlert(i18n.t("alert:successfully_created"), "success"));
            dispatch({
                type: CREATE_PROFILE,
                payload: res.data,
            });
        } else {
            const res = await axios.put("/api/profiles", body, { headers });

            dispatch(setAlert(i18n.t("alert:successfully_edited"), "success"));
            dispatch({
                type: EDIT_PROFILE,
                payload: res.data,
            });
        }
    } catch (err) {
        let alertError;
        if (err.response && err.response.status === 415) {
            alertError = "format_not_supported";
        } else {
            alertError = "server_error";
        }

        dispatch(setAlert(i18n.t(`alert:${alertError}`), "error"));
        dispatch({
            type: MY_PROFILE_FAIL,
        });
    }
};

export const deleteProfile = (history) => async (dispatch) => {
    try {
        await axios.delete("/api/profiles", { headers });

        dispatch(setAlert(i18n.t("alert:successfully_deleted"), "success"));
        dispatch({
            type: DELETE_PROFILE,
        });
        history.push("/profiles");
    } catch (err) {
        dispatch(setAlert(i18n.t("alert:server_error"), "error"));
        dispatch({
            type: PROFILE_FAIL,
        });
    }
};
