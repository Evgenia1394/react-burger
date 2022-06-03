import {Redirect, Route, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoadingPage from "./loading-page/loading-page";
import {useEffect} from "react";
import {userInfo} from "../services/actions/thunks";
import getCookie from "../utils/get-cookie";
import PropTypes from "prop-types";

function ProtectedAuthRoute ({onlyUnAuth = false, ...rest}) {

    const isAuthChecked = useSelector((state) => state.userInfoReducer.isAuthChecked)
    const user = useSelector((state) => state.userInfoReducer.feedUserInfo)
    const location = useLocation();
    const dispatch = useDispatch();
    const accessToken = getCookie('accessToken');

    useEffect(() => {
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

ProtectedAuthRoute.propTypes = {
    children: PropTypes.node,
    rest: PropTypes.any
}
