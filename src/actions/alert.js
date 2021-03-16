export const SET_ALERT = "SET_ALERT";

export const setAlert = (message, condition = "warning") => {
    return {
        type: SET_ALERT,
        payload: { message, condition },
    };
};
