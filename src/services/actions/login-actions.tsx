import {ActionTypeCreatorFeed} from "../../types";

export const POST_LOGIN = 'POST_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export enum loginActions {
    POST_LOGIN = 'POST_LOGIN',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILED = 'LOGIN_FAILED'
}

export type TLoginPostAction = ActionTypeCreatorFeed<loginActions.POST_LOGIN, null>;
export type TLoginSuccessAction = Required<ActionTypeCreatorFeed<loginActions.LOGIN_SUCCESS, {success: boolean, accessToken: string, refreshToken: string, user:  {name: string, email: string}}>>;
export type TLoginFailedAction = ActionTypeCreatorFeed<loginActions.LOGIN_FAILED, null>;

export type TLoginActions = TLoginPostAction | TLoginSuccessAction | TLoginFailedAction;
