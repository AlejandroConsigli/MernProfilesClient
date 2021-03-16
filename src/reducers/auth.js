import {
    LOADING_AUTH,
    SIGNUP,
    SIGNIN,
    ACTIVATE,
    FORGOT,
    AUTH,
    LOGOUT,
    AUTH_FAIL,
} from "../actions/auth";

const initialState = {
    authenticated: false,
    loading: true,
};

export default function (state = initialState, action) {
    const { type } = action;

    switch (type) {
        case LOADING_AUTH:
            return {
                ...state,
                loading: true,
            };
        case SIGNUP:
        case FORGOT:
            return {
                ...state,
                loading: false,
            };
        case SIGNIN:
        case ACTIVATE:
        case AUTH:
            return {
                ...state,
                authenticated: true,
                loading: false,
            };
        case AUTH_FAIL:
        case LOGOUT:
            return {
                ...state,
                authenticated: false,
                loading: false,
            };
        default:
            return state;
    }
}
