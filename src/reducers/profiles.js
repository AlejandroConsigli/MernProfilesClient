import {
    LOADING_MY_PROFILE,
    LOADING_PROFILE,
    SET_PROFILE,
    SET_MY_PROFILE,
    SET_PROFILES,
    CREATE_PROFILE,
    EDIT_PROFILE,
    DELETE_PROFILE,
    MY_PROFILE_FAIL,
    PROFILE_FAIL,
} from "../actions/profiles";

const initialState = {
    myLoading: true,
    loading: true,
    profile: null,
    myProfile: null,
    profiles: [],
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOADING_MY_PROFILE:
            return {
                ...state,
                myLoading: true,
            };
        case LOADING_PROFILE:
            return {
                ...state,
                loading: true,
            };
        case SET_MY_PROFILE:
        case CREATE_PROFILE:
        case EDIT_PROFILE:
            return {
                ...state,
                myLoading: false,
                myProfile: payload,
            };
        case SET_PROFILE:
            return {
                ...state,
                loading: false,
                profile: payload,
            };
        case SET_PROFILES:
            return {
                ...state,
                loading: false,
                profiles: payload,
            };
        case MY_PROFILE_FAIL:
            return {
                ...state,
                myLoading: false,
                myProfile: null,
            };
        case PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                profile: null,
                profiles: [],
            };
        case DELETE_PROFILE:
            return {
                ...state,
                loading: false,
                myProfile: null,
                profile: null,
                profiles: [],
            };
        default:
            return state;
    }
}
