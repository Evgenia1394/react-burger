import {ActionTypeCreatorFeed} from "../../types";

export const POST_REGISTRATION = 'POST_REGISTRATION';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export enum registrationActions {
    POST_REGISTRATION = 'POST_REGISTRATION',
    REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
    REGISTRATION_FAILED = 'REGISTRATION_FAILED',
}

export type TRegistrationPostAction = ActionTypeCreatorFeed<registrationActions.POST_REGISTRATION, null>;
export type TRegistrationSuccessAction = ActionTypeCreatorFeed<registrationActions.REGISTRATION_SUCCESS, {success: boolean, user: {}, accessToken: string, refreshToken: string}>;
export type TRegistrationFailedAction = ActionTypeCreatorFeed<registrationActions.REGISTRATION_FAILED, null>;

export type TRegistrationActions = TRegistrationPostAction | TRegistrationSuccessAction | TRegistrationFailedAction;

