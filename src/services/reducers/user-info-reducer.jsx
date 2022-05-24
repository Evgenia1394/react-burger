import {CLEAR_USER, EDIT_USER, GET_USER, USER_FAILED, USER_SUCCESS} from "../actions/user-info-actions";

export const defaultUserInfoState = {
    userInfoReducer: {
        feedUserInfoRequest: false,
        feedUserInfoFailed: false,
        feedUserInfo: {success: false, user: {}}
    }
};

export const userInfoReducer = (state = defaultUserInfoState, action) => {
    switch (action.type) {
        case GET_USER: {
            return {
                ...state,
                feedUserInfoRequest: true,
                feedUserInfoFailed: false,
            };
        }
        case USER_SUCCESS: {
            return {
                ...state,
                feedUserInfo: action.feed,
                feedUserInfoRequest: false
            };
        }
        case USER_FAILED: {
            return {
                ...state,
                feedUserInfoFailed: true,
                feedUserInfoRequest: false
            };
        }
        case EDIT_USER: {
            return {
                ...state,
                feedUserInfo: action.feed,
                feedUserInfoRequest: false
            };
        }
        case CLEAR_USER: {
            return {
                ...state,
                feedUserInfoRequest: false,
                feedUserInfoFailed: false,
                feedUserInfo: {success: false, user: {}}
            };
        }
        default: {
            return state
        }
    }
}
