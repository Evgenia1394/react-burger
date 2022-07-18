import {ActionTypeCreatorFeed, ActionTypeCreatorId, ActionTypeCreatorPayload} from "../../types";
import {constructorActions} from "./constructor-actions";

export const POST_EMAIL = 'POST_EMAIL';
export const GET_EMAIL_SUCCESS = 'GET_EMAIL_SUCCESS';
export const GET_EMAIL_FAILED = 'GET_EMAIL_FAILED';

export enum forgotPasswordActions {
    POST_EMAIL = 'POST_EMAIL',
    GET_EMAIL_SUCCESS = 'GET_EMAIL_SUCCESS',
    GET_EMAIL_FAILED = 'GET_EMAIL_FAILED'
}

export type TForgotPassworPostEmailAction = ActionTypeCreatorFeed<forgotPasswordActions.POST_EMAIL, null>;
export type TForgotPassworEmailSuccessAction = Required<ActionTypeCreatorFeed<forgotPasswordActions.GET_EMAIL_SUCCESS, {success: false, message: ''}>>;
export type TForgotPassworEmailFailedAction = ActionTypeCreatorFeed<forgotPasswordActions.GET_EMAIL_FAILED, null>;


export type TForgotPasswordActions = TForgotPassworPostEmailAction | TForgotPassworEmailSuccessAction | TForgotPassworEmailFailedAction;
