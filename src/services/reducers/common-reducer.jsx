import { combineReducers } from "redux";
import {allIngredientsReducer} from "./all-ingredients-reducer";
import {draggableConstructorReducer} from "./constructor-reducer";
import {orderReducer} from "./order-reducer";
import {ingredientReducer} from "./ingredient-reducer";
import {forgotPasswordReducer} from "./forgot-password-reducer";
import {resetPasswordReducer} from "./reset-password-reducer";
import {registrationReducer} from "./registration-reducer";
import {loginReducer} from "./login-reducer";
import {logoutReducer} from "./logout-reducer";
import {userInfoReducer} from "./user-info-reducer";
import {modalReducer} from "./modal-reducer";

export const commonReducer = combineReducers({
    allIngredientsReducer,
    draggableConstructorReducer,
    orderReducer,
    ingredientReducer,
    forgotPasswordReducer,
    resetPasswordReducer,
    registrationReducer,
    loginReducer,
    logoutReducer,
    userInfoReducer,
    modalReducer
    })
