import {ActionTypeCreatorFeed} from "../../types";

export const REQUEST_ONE_ORDER = 'REQUEST_ONE_ORDER';
export const SUCCESS_ONE_ORDER = 'SUCCESS_ONE_ORDER';
export const FAILED_ONE_ORDER = 'FAILED_ONE_ORDER';

export enum oneOrderActions {
    REQUEST_ONE_ORDER = 'REQUEST_ONE_ORDER',
    SUCCESS_ONE_ORDER = 'SUCCESS_ONE_ORDER',
    FAILED_ONE_ORDER = 'FAILED_ONE_ORDER',
}

export type TRequestOneOrderAction =  ActionTypeCreatorFeed<oneOrderActions.REQUEST_ONE_ORDER, null>;
export type TSuccessOneOrderAction =  Required<ActionTypeCreatorFeed<oneOrderActions.SUCCESS_ONE_ORDER, any>>;
export type TFailedOneOrderAction =  ActionTypeCreatorFeed<oneOrderActions.FAILED_ONE_ORDER, null>;

export type TOneOrderActions = TRequestOneOrderAction | TSuccessOneOrderAction | TFailedOneOrderAction;
