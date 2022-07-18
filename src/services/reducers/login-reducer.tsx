import {LOGIN_FAILED, LOGIN_SUCCESS, POST_LOGIN, TLoginActions} from "../actions/login-actions";

export type TLoginState = {
        feedLoginRequest: boolean,
        feedLoginFailed: boolean,
        feedLogin: {success: boolean, accessToken: string, refreshToken: string, user: {name: string, email: string}},
        isLogged: boolean
};

export const defaultLoginState = {
        feedLoginRequest: false,
        feedLoginFailed: false,
        feedLogin: {success: false, accessToken: '', refreshToken: '', user: {name: "", email: ""}},
        isLogged: false
};

export const loginReducer = (state: TLoginState = defaultLoginState, action: TLoginActions): TLoginState => {
    switch (action.type) {
        case POST_LOGIN: {
            return {
                ...state,
                feedLoginRequest: true,
                feedLoginFailed: false,
                isLogged: false
            };
        }
        case LOGIN_SUCCESS: {
            document.cookie = `token=${action.feed.refreshToken}`;
            document.cookie = `accessToken=${action.feed.accessToken}`;
            return {
                ...state,
                feedLogin: action.feed,
                feedLoginRequest: false,
                isLogged: true
            };
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                feedLoginFailed: true,
                feedLoginRequest: false,
                isLogged: false,
                feedLogin: {success: false, accessToken: '', refreshToken: '', user: {name: "", email: ""}},
            };
        }
        default: {
            return state
        }
    }
}
