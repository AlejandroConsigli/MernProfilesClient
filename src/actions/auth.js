import axios from "axios";
import { headers } from "../shared/utils/conf";
import { setAlert } from "./alert";
import i18n from "../i18next";
import setAuthToken from "../shared/utils/setAuthToken";
import { LOADING_USER, SET_USER } from "./user";
import { SET_MY_PROFILE } from "./profiles";
import { getMyProfile } from "./profiles";

export const LOADING_AUTH = "LOADING_AUTH";
export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const ACTIVATE = "ACTIVATE";
export const FORGOT = "FORGOT";
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";
export const AUTH_FAIL = "AUTH_FAIL";

const saveToken = (data) => {
    localStorage.setItem("token", data.token);
};

const removeToken = () => {
    localStorage.removeItem("token");
};

export const auth = () => async (dispatch) => {
    const authFail = () => {
        removeToken();
        dispatch({
            type: AUTH_FAIL,
        });
    };

    dispatch({
        type: LOADING_AUTH,
    });
    dispatch({
        type: LOADING_USER,
    });

    if (localStorage.token) {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.get("/api/auth");
            dispatch({
                type: AUTH,
            });
            dispatch({
                type: SET_USER,
                payload: res.data,
            });
            dispatch(getMyProfile());
        } catch (err) {
            authFail();
        }
    } else {
        authFail();
    }
};

export const signin = (email, password) => async (dispatch) => {
    dispatch({
        type: LOADING_AUTH,
    });
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post("/api/auth/signin", body, { headers });

        saveToken(res.data);
        dispatch({
            type: SIGNIN,
        });
        dispatch(auth());
    } catch (err) {
        let alertError;
        if (err.response && err.response.status === 401) {
            alertError = "invalid_credentials";
        } else {
            alertError = "server_error";
        }

        dispatch(setAlert(i18n.t(`alert:${alertError}`), "error"));
        removeToken();
        dispatch({
            type: AUTH_FAIL,
        });
    }
};

export const signup = (email, name, lastname, password) => async (dispatch) => {
    dispatch({
        type: LOADING_AUTH,
    });
    const body = JSON.stringify({ email, name, lastname, password });

    try {
        await axios.post("/api/auth/signup", body, { headers });

        dispatch({
            type: SIGNUP,
        });
        dispatch(setAlert(i18n.t("alert:check_email"), "success"));
    } catch (err) {
        let alertError;
        if (err.response && err.response.status === 409) {
            alertError = "user_already_exists";
        } else {
            alertError = "server_error";
        }

        dispatch(setAlert(i18n.t(`alert:${alertError}`), "error"));
        removeToken();
        dispatch({
            type: AUTH_FAIL,
        });
    }
};

export const activate = (token) => async (dispatch) => {
    dispatch({
        type: LOADING_AUTH,
    });

    try {
        const res = await axios.get(`/api/auth/activate/${token}`, { headers });

        saveToken(res.data);
        dispatch({
            type: ACTIVATE,
        });
        dispatch(auth());
    } catch (err) {
        removeToken();
        dispatch({
            type: AUTH_FAIL,
        });
    }
};

export const forgot = (email) => async (dispatch) => {
    dispatch({
        type: LOADING_AUTH,
    });
    const body = JSON.stringify({ email });

    try {
        await axios.post("/api/auth/forgot", body, { headers });

        dispatch({
            type: FORGOT,
        });
        dispatch(setAlert(i18n.t("alert:check_email"), "success"));
    } catch (err) {
        let alertError;
        if (err.response && err.response.status === 404) {
            alertError = "user_not_exists";
        } else {
            alertError = "server_error";
        }

        dispatch(setAlert(i18n.t(`alert:${alertError}`), "error"));
        removeToken();
        dispatch({
            type: AUTH_FAIL,
        });
    }
};

export const logout = () => (dispatch) => {
    removeToken();
    dispatch({
        type: SET_USER,
        payload: null,
    });
    dispatch({
        type: SET_MY_PROFILE,
        payload: null,
    });
    dispatch({
        type: LOGOUT,
    });
};
