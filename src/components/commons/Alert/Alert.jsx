import { memo, useEffect } from "react";
import styles from "./alert.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

toast.configure({
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: true,
    pauseOnFocusLoss: false,
    closeOnClick: false,
    pauseOnHover: true,
    closeButton: false,
    className: styles.mytoastify,
});

const Alert = () => {
    const alertStates = useSelector((state) => state.alert);

    useEffect(() => {
        alertStates.message &&
            toast(alertStates.message, { className: styles[alertStates.condition] });
    }, [alertStates]);
};

export default memo(Alert);
