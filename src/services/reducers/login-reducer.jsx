import {LOGIN_FAILED, LOGIN_SUCCESS, POST_LOGIN} from "../actions/login-actions";

export const defaultLoginState = {
    loginReducer: {
        feedLoginRequest: false,
        feedLoginFailed: false,
        feedLogin: {success: false, accessToken: '', refreshToken: '', user: {}}
    }
};

export const loginReducer = (state = defaultLoginState, action) => {
    switch (action.type) {
        case POST_LOGIN: {
            return {
                ...state,
                feedLoginRequest: true,
                feedLoginFailed: false,
            };
        }
        case LOGIN_SUCCESS: {
            document.cookie = `token=${action.feed.refreshToken}`;
            document.cookie = `accessToken=${action.feed.accessToken}`;
            return {
                ...state,
                feedLogin: action.feed,
                feedLoginRequest: false
            };
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                feedLoginFailed: true,
                feedLoginRequest: false
            };
        }
        default: {
            return state
        }
    }
}
