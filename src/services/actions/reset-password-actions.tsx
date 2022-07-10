import {ActionTypeCreatorFeed} from "../../types";

export const POST_RESET_PASSWORD = 'POST_RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export enum resetPasswordActions {
    POST_RESET_PASSWORD = 'POST_RESET_PASSWORD',
    RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED',
}

export type TResetPasswordPostAction = ActionTypeCreatorFeed<resetPasswordActions.POST_RESET_PASSWORD, null>;
export type TResetPasswordSuccessAction = Required<ActionTypeCreatorFeed<resetPasswordActions.RESET_PASSWORD_SUCCESS, {success: boolean, message: string}>>;
export type TResetPasswordFailedAction = ActionTypeCreatorFeed<resetPasswordActions.RESET_PASSWORD_FAILED, null>;

export type TResetPasswordActions = TResetPasswordPostAction | TResetPasswordSuccessAction | TResetPasswordFailedAction;
