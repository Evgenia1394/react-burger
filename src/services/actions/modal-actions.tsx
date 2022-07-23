import {ActionTypeCreatorFeed} from "../../types";

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export enum modalActions {
    OPEN_MODAL = 'OPEN_MODAL',
    CLOSE_MODAL = 'CLOSE_MODAL',
}

export type TModalOpenAction = ActionTypeCreatorFeed<modalActions.OPEN_MODAL, null>;
export type TModalCloseAction = ActionTypeCreatorFeed<modalActions.CLOSE_MODAL, null>;

export type TModalActions = TModalOpenAction | TModalCloseAction;
