import {LOGOUT_FAILED, LOGOUT_SUCCESS, POST_LOGOUT} from "../actions/logout-actions";
import deleteCookie from "../../utils/delete-cookie";

export const defaultLogoutState = {
    logoutReducer: {
        feedLogoutRequest: false,
        feedLogoutFailed: false,
        feedLogout: {success: false, message: ''}
    }
};

export const logoutReducer = (state = defaultLogoutState, action) => {
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
