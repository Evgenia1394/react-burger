import {Redirect, Route, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoadingPage from "./loading-page/loading-page";
import {useEffect} from "react";
import {userInfo} from "../services/actions/thunks";
import getCookie from "../utils/get-cookie";
import PropTypes, {string} from "prop-types";

function ProtectedAuthRoute ({onlyUnAuth = false, ...rest}) {

    // @ts-ignore
    const isAuthChecked = useSelector((state) => state.userInfoReducer.isAuthChecked);
    // @ts-ignore
    const user = useSelector((state) => state.userInfoReducer.feedUserInfo);
    const location = useLocation<{ from: { pathname: string }}>();
    const dispatch = useDispatch();
    const accessToken = getCookie('accessToken');

    useEffect(() => {
        // @ts-ignore
        dispatch(userInfo(accessToken));
    },[])

    if (!isAuthChecked) {
        return <LoadingPage />;
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: '/' } };
        return <Redirect to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return (
            <Redirect
                to={{
                pathname: '/login',
                state: { from: location }
            }}
            />
        )
    }

    return <Route {...rest} />;
}

export default ProtectedAuthRoute;


