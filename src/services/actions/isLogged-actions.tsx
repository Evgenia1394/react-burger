import {ActionTypeCreatorPayload} from "../../types";

export const IS_LOGGED = 'IS_LOGGED';
export const NOT_LOGGED = 'NOT_LOGGED';

export enum isLoggedActions {
    IS_LOGGED = 'IS_LOGGED',
    NOT_LOGGED = 'NOT_LOGGED',
}

export type TIsLoggedAction = ActionTypeCreatorPayload<isLoggedActions.IS_LOGGED, null>;
export type TNotLoggedAction = ActionTypeCreatorPayload<isLoggedActions.NOT_LOGGED, null>;

export type TIsLoggedActions = TIsLoggedAction | TNotLoggedAction;
