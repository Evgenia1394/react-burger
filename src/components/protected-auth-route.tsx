import {Redirect, Route, useLocation, RouteProps} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoadingPage from "./loading-page/loading-page";
import {useEffect} from "react";
import {userInfo} from "../services/actions/thunks";
import getCookie from "../utils/get-cookie";
import {useMyDispatch, useMySelector} from "../services/store";

function ProtectedAuthRoute ({onlyUnAuth = false, ...rest}: RouteProps & {onlyUnAuth?: boolean}) {

    const isAuthChecked = useMySelector((state) => state.userInfoReducer.isAuthChecked);

    const user = useMySelector((state) => state.userInfoReducer.feedUserInfo);
    const location = useLocation<{ from: { pathname: string }}>();
    const dispatch = useMyDispatch();
    const accessToken = getCookie('accessToken');

    useEffect(() => {
        // @ts-ignore
        dispatch(userInfo(accessToken));
    },[])

    if (!isAuthChecked) {
        return <LoadingPage />;
    }

    if (onlyUnAuth && user.success === true) {
        const { from } = location.state || { from: { pathname: '/' } };
        return <Redirect to={from} />;
    }

    if (!onlyUnAuth && user.success === false) {
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


