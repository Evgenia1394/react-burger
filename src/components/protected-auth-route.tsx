import {Redirect, Route, useLocation, RouteProps} from "react-router-dom";
import LoadingPage from "./loading-page/loading-page";
import {useEffect} from "react";
import {userInfo} from "../services/actions/thunks";
import getCookie from "../utils/get-cookie";
import {useMyDispatch, useMySelector} from "../services/store";

function ProtectedAuthRoute ({onlyUnAuth = false, ...rest}: RouteProps & {onlyUnAuth?: boolean}) {

    const isAuthChecked = useMySelector((state) => state.userInfoReducer.isAuthChecked);
    const isLogin = useMySelector((state) => state.loginReducer.feedLogin.success)
    const isLoginRequest = useMySelector((state) => state.loginReducer.feedLoginRequest)
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

    //Никак не могу понять как поправить этот комментарий:
    //после логина меня никуда не перенаправляет. Если пользователь не авторизован и пытается попасть на защищённый маршрут — его переадресовывает на маршрут /login. После авторизации пользователь автоматически переадресовывается на тот маршрут, к которому у него не получилось получить доступ ранее. Это делается с помощью location?.state?.from || '/' (эти данные записываются в ProtectedRoute, а используются в Login для Redirect)
    //Пробовала, разными способами, но никак не получается, нужна ваша помощь, знаю, что проблема где-то здесь, но не могу ее победить

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


