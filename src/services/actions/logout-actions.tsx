import {ActionTypeCreatorFeed} from "../../types";

export const POST_LOGOUT = 'POST_LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export enum logoutActions {
    POST_LOGOUT = 'POST_LOGOUT',
    LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
    LOGOUT_FAILED = 'LOGOUT_FAILED'
}

export type TLogoutPostAction = ActionTypeCreatorFeed<logoutActions.POST_LOGOUT, null>;
export type TLogoutSuccessAction = Required<ActionTypeCreatorFeed<logoutActions.LOGOUT_SUCCESS, {success: boolean, message: string} | boolean>>;
export type TLogoutFailedAction = ActionTypeCreatorFeed<logoutActions.LOGOUT_FAILED, null>;

export type TLogoutActions = TLogoutPostAction | TLogoutSuccessAction | TLogoutFailedAction;
