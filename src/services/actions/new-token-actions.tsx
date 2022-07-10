import {ActionTypeCreatorFeed} from "../../types";

export const POST_TOKEN = 'POST_TOKEN';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILED = 'TOKEN_FAILED';

export enum newTokenActions {
    POST_TOKEN = 'POST_TOKEN',
    TOKEN_SUCCESS = 'TOKEN_SUCCESS',
    TOKEN_FAILED = 'TOKEN_FAILED'
}

export type TNewTokenPostAction = ActionTypeCreatorFeed<newTokenActions.POST_TOKEN, null>;
export type TNewTokenSuccessAction = ActionTypeCreatorFeed<newTokenActions.TOKEN_SUCCESS, {success: boolean, accessToken: string, refreshToken: string}>;
export type TNewTokenFailedAction = ActionTypeCreatorFeed<newTokenActions.TOKEN_FAILED, null>;

export type TNewTokenActions = TNewTokenPostAction | TNewTokenSuccessAction | TNewTokenFailedAction;
