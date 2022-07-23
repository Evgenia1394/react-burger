import {ActionTypeCreatorFeed} from "../../types";
import * as buffer from "buffer";

export const POST_ORDER = 'POST_ORDER';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export enum orderActions {
    POST_ORDER = 'POST_ORDER',
    GET_ORDER_FAILED = 'GET_ORDER_FAILED',
    GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS',
    CLEAR_ORDER = 'CLEAR_ORDER'
}

export type TOrderPostAction = ActionTypeCreatorFeed<orderActions.POST_ORDER, null>;
export type TOrderSuccessAction = Required<ActionTypeCreatorFeed<orderActions.GET_ORDER_SUCCESS,  {success: boolean, order: {number: string} }>>;
export type TOrderFailedAction = ActionTypeCreatorFeed<orderActions.GET_ORDER_FAILED, null>;
export type TOrderClearAction = ActionTypeCreatorFeed<orderActions.CLEAR_ORDER, {success: boolean, data: Array<string>}>;

export type TOrderActions = TOrderPostAction | TOrderSuccessAction | TOrderFailedAction | TOrderClearAction;
