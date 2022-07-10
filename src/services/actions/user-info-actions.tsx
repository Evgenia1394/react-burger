import {ActionTypeCreatorFeed, IUser} from "../../types";

export const GET_USER = 'GET_USER';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';
export const EDIT_USER = 'EDIT_USER';
export const CLEAR_USER = 'CLEAR_USER';

export enum userActions {
    GET_USER = 'GET_USER',
    USER_SUCCESS = 'USER_SUCCESS',
    USER_FAILED = 'USER_FAILED',
    CLEAR_USER = 'CLEAR_USER',
    EDIT_USER = 'EDIT_USER'
}

export type TUserGetAction = ActionTypeCreatorFeed<userActions.GET_USER, null>;
export type TUserSuccessAction = Required<ActionTypeCreatorFeed<userActions.USER_SUCCESS, {success: boolean, user: IUser}>>;
export type TUserFailedAction = ActionTypeCreatorFeed<userActions.USER_FAILED, null>;
export type TUserClearAction = ActionTypeCreatorFeed<userActions.CLEAR_USER, {success: boolean, user: IUser}>;
export type TUserEditAction = Required<ActionTypeCreatorFeed<userActions.EDIT_USER, {success: boolean, user: IUser}>>;

export type TUserActions = TUserGetAction | TUserSuccessAction | TUserFailedAction | TUserClearAction | TUserEditAction;
