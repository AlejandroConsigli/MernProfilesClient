import axios from "axios";
import { headers } from "../shared/utils/conf";
import { setAlert } from "./alert";
import i18n from "../i18next";
import { logout } from "./auth";

export const LOADING_USER = "LOADING_USER";
export const SET_USER = "SET_USER";
export const EDIT_PASSWORD = "EDIT_PASSWORD";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
export const USER_FAIL = "USER_FAIL";

export const editPassword = (password, history) => async (dispatch) => {
    dispatch({
        type: LOADING_USER,
    });
    const body = JSON.stringify({ password });

    try {
        const res = await axios.put("/api/user/password", body, { headers });

        dispatch(setAlert(i18n.t("alert:successfully_edited"), "success"));
        dispatch({
            type: EDIT_PASSWORD,
            payload: res.data,
        });
        history && history.push("/signin");
    } catch (err) {
        dispatch(setAlert(i18n.t("alert:server_error"), "error"));
        dispatch({
            type: USER_FAIL,
        });
    }
};

export const editUser = (name, lastname) => async (dispatch) => {
    dispatch({
        type: LOADING_USER,
    });
    const body = JSON.stringify({ name, lastname });

    try {
        const res = await axios.put("/api/user", body, { headers });

        dispatch(setAlert(i18n.t("alert:successfully_edited"), "success"));
        dispatch({
            type: EDIT_USER,
            payload: res.data,
        });
    } catch (err) {
        dispatch(setAlert(i18n.t("alert:server_error"), "error"));
        dispatch({
            type: USER_FAIL,
        });
    }
};

export const deleteUser = () => async (dispatch) => {
    try {
        await axios.delete("/api/user", { headers });

        dispatch(setAlert(i18n.t("alert:successfully_deleted"), "success"));
        dispatch({
            type: DELETE_USER,
        });
        dispatch(logout());
    } catch (err) {
        dispatch(setAlert(i18n.t("alert:server_error"), "error"));
        dispatch({
            type: USER_FAIL,
        });
    }
};
