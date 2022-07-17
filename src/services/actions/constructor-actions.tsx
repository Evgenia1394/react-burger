import {ActionTypeCreatorId, ActionTypeCreatorPayload, IBurgerItem} from "../../types";

export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REPLACE_BUN = 'REPLACE_BUN';
export const SORT_INGREDIENT = 'SORT_INGREDIENT';

export enum constructorActions {
    INCREASE_COUNT = 'INCREASE_COUNT',
    DECREASE_COUNT = 'DECREASE_COUNT',
    ADD_INGREDIENT = 'ADD_INGREDIENT',
    REPLACE_BUN = 'REPLACE_BUN',
    SORT_INGREDIENT = 'SORT_INGREDIENT',
}

export type TConstructorIncreaseAction = ActionTypeCreatorId<constructorActions.INCREASE_COUNT, string>;
export type TConstructorDecreaseAction = Required<ActionTypeCreatorId<constructorActions.DECREASE_COUNT, string>>;
export type TConstructorAddAction = Required<ActionTypeCreatorPayload<constructorActions.ADD_INGREDIENT, IBurgerItem>>;
export type TConstructorReplaceBunAction = ActionTypeCreatorPayload<constructorActions.REPLACE_BUN, string>;
export type TConstructorSortAction = Required<ActionTypeCreatorPayload<constructorActions.SORT_INGREDIENT, { dragIngredient: IBurgerItem, dropIngredient: IBurgerItem }>>;


export type TConstructorActions =
    TConstructorIncreaseAction
    | TConstructorDecreaseAction
    | TConstructorAddAction
    | TConstructorReplaceBunAction
    | TConstructorSortAction;
