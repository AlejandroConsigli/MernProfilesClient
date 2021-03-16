import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import user from "./user";
import profiles from "./profiles";

const rootReducer = combineReducers({
    alert,
    auth,
    user,
    profiles,
});

export default rootReducer;
