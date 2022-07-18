import { ActionTypeCreatorPayload, IBurgerItem } from "../../types";

export const OPEN_INGREDIENT = 'OPEN_INGREDIENT';
export const CLEAR_INGREDIENT = 'CLEAR_INGREDIENT';

export enum ingredientActions {
    OPEN_INGREDIENT = 'OPEN_INGREDIENT',
    CLEAR_INGREDIENT = 'CLEAR_INGREDIENT',
}

export type TIngredientOpenAction =  Required<ActionTypeCreatorPayload<ingredientActions.OPEN_INGREDIENT, IBurgerItem>>;
export type TIngredientClearAction = ActionTypeCreatorPayload<ingredientActions.CLEAR_INGREDIENT, null>;

export type TIngredientActions = TIngredientOpenAction | TIngredientClearAction;
