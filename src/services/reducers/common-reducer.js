import { combineReducers } from "redux";
import {allIngredientsReducer} from "./all-ingredients-reducer";
import {draggableConstructorReducer} from "./constructor-reducer";
import {orderReducer} from "./order-reducer";
import {ingredientReducer} from "./ingredient-reducer";

export const commonReducer = combineReducers({
    allIngredientsReducer,
    draggableConstructorReducer,
    orderReducer,
    ingredientReducer
    })
