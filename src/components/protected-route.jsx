import {Route, Redirect, useHistory, useLocation} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userInfo} from "../services/actions/thunks";
import getCookie from "../utils/get-cookie";
import LoadingPage from "./loading-page/loading-page";
import ErrorPage from "./error-page/error-page";
import PropTypes from "prop-types";

export function ProtectedRoute({children, ...rest}) {
    let {feedUserInfoRequest, feedUserInfoFailed, feedUserInfo} = useSelector(state => state.userInfoReducer);
    const [isUserLoaded, setUserLoaded] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();

    const accessToken = getCookie('accessToken')

    const init = async () => {
        await dispatch(userInfo(accessToken));
    };

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        if (feedUserInfo) {
            setUserLoaded(false)
        }
    }, [feedUserInfoRequest])


    if (feedUserInfoFailed) {
        history.replace({pathname: '/login'})
    }

    return (
        <>
            {!isUserLoaded &&
            <>
                {feedUserInfoFailed &&
                <ErrorPage/>
                }
                {feedUserInfoRequest &&
                <LoadingPage/>
                }
                {!feedUserInfoFailed && !feedUserInfoRequest &&
                <>
                    <Route
                        {...rest}
                        render={({ location }) =>
                            (feedUserInfo.user) ? (children) : (< Redirect to='/login'/>)
                        }
                    />
                </>}
            </>
            }
        </>
    );
}

ProtectedRoute.propTypes = {
    children: PropTypes.node,
    rest: PropTypes.any
}
