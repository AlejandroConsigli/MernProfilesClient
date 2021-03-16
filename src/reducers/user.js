import {
    LOADING_USER,
    SET_USER,
    EDIT_PASSWORD,
    EDIT_USER,
    DELETE_USER,
    USER_FAIL,
} from "../actions/user";

const initialState = {
    loading: true,
    user: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOADING_USER:
            return {
                ...state,
                loading: true,
            };
        case SET_USER:
        case EDIT_PASSWORD:
        case EDIT_USER:
            return {
                ...state,
                loading: false,
                user: payload,
            };
        case DELETE_USER:
        case USER_FAIL:
            return {
                ...state,
                loading: false,
                user: null,
            };
        default:
            return state;
    }
}
