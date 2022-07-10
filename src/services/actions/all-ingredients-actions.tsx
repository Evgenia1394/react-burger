import { ActionTypeCreatorFeed, IBurgerItem } from "../../types";

export const GET_ALLINGREDIENTS_REQUEST = 'GET_ALLINGREDIENTS_REQUEST';
export const GET_FEED_FAILED = 'GET_FEED_FAILED';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';

export enum defaultAllIngredientsActions {
    GET_ALLINGREDIENTS_REQUEST = 'GET_ALLINGREDIENTS_REQUEST',
    GET_FEED_FAILED = 'GET_FEED_FAILED',
    GET_FEED_SUCCESS = 'GET_FEED_SUCCESS',
}

export type TAllIngredientsRequestAction = ActionTypeCreatorFeed<defaultAllIngredientsActions.GET_ALLINGREDIENTS_REQUEST, null>;
export type TAllIngredientsFailedAction = Required<ActionTypeCreatorFeed<defaultAllIngredientsActions.GET_FEED_FAILED, null>>;
export type TAllIngredientsSuccessAction = Required<ActionTypeCreatorFeed<defaultAllIngredientsActions.GET_FEED_SUCCESS, {success: boolean, data: Array<IBurgerItem> | null}>>;

export type TAllIngredientsActions = TAllIngredientsRequestAction | TAllIngredientsFailedAction | TAllIngredientsSuccessAction;
