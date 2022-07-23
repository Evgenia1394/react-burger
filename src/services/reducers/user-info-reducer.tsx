import {TUserActions, userActions} from "../actions/user-info-actions";
import {IUser} from "../../types";

export type TUserState = {
        feedUserInfoRequest: boolean,
        feedUserInfoFailed: boolean,
        feedUserInfo: {success: boolean, user: IUser},
        isAuthChecked: boolean,
};

export const defaultUserInfoState = {
        feedUserInfoRequest: false,
        feedUserInfoFailed: false,
        feedUserInfo: {success: false, user: {}},
        isAuthChecked: false,
};

export const userInfoReducer = (state: TUserState = defaultUserInfoState, action: TUserActions): TUserState => {
    switch (action.type) {
        case userActions.GET_USER: {
            return {
                ...state,
                feedUserInfoRequest: true,
                feedUserInfoFailed: false,
            };
        }
        case userActions.USER_SUCCESS: {
            return {
                ...state,
                feedUserInfo: action.feed,
                feedUserInfoRequest: false,
                isAuthChecked: true
            };
        }
        case userActions.USER_FAILED: {
            return {
                ...state,
                feedUserInfoFailed: true,
                feedUserInfoRequest: false,
                isAuthChecked: true
            };
        }
        case userActions.EDIT_USER: {
            return {
                ...state,
                feedUserInfo: action.feed,
                feedUserInfoRequest: false,
                isAuthChecked: true
            };
        }
        case userActions.CLEAR_USER: {
            return {
                ...state,
                feedUserInfoRequest: false,
                feedUserInfoFailed: false,
                feedUserInfo: {success: false, user: {}},
            };
        }
        default: {
            return state
        }
    }
}
