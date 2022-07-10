import {LOGOUT_FAILED, LOGOUT_SUCCESS, POST_LOGOUT, TLogoutActions} from "../actions/logout-actions";
import deleteCookie from "../../utils/delete-cookie";

export type TLogoutState = {
        feedLogoutRequest: boolean,
        feedLogoutFailed: boolean,
        feedLogout: {success: boolean, message: string} | boolean
};

export const defaultLogoutState = {
        feedLogoutRequest: false,
        feedLogoutFailed: false,
        feedLogout: {success: false, message: ''}
};

export const logoutReducer = (state: TLogoutState = defaultLogoutState, action: TLogoutActions): TLogoutState => {
    switch (action.type) {
        case POST_LOGOUT: {
            return {
                ...state,
                feedLogoutRequest: true,
                feedLogoutFailed: false,
            };
        }
        case LOGOUT_SUCCESS: {
            deleteCookie('token');
            deleteCookie('accessToken');
            return {
                ...state,
                feedLogout: action.feed,
                feedLogoutRequest: false
            };
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                feedLogoutFailed: true,
                feedLogoutRequest: false
            };
        }
        default: {
            return state
        }
    }
}
