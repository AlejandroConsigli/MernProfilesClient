import { SET_ALERT } from "../actions/alert";

const initialState = {
    message: "",
    condition: "warning",
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            return {
                ...state,
                message: payload.message,
                condition: payload.condition,
            };
        default:
            return state;
    }
}
