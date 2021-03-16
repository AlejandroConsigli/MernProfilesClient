import React, { memo, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Body from "./components/commons/Body/Body";
import Spinner from "./components/commons/Spinner/Spinner";
import { Provider } from "react-redux";
import { store } from "./store";

const Routes = lazy(() => import("./routing/Routes"));
const Alert = lazy(() => import("./components/commons/Alert/Alert"));

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Body>
                    <Suspense fallback={<Spinner />}>
                        <Alert />
                        <Route component={Routes} />
                    </Suspense>
                </Body>
            </Router>
        </Provider>
    );
};
export default memo(App);
