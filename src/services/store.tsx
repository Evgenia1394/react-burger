import {applyMiddleware, createStore, compose, ActionCreator, Action} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import { commonReducer } from './reducers/common-reducer'
import {
    TAllIngredientsActions,
    TAllIngredientsRequestAction,
    TAllIngredientsSuccessAction
} from "./actions/all-ingredients-actions";
import {TConstructorActions} from "./actions/constructor-actions";
import {TForgotPasswordActions, TForgotPassworEmailSuccessAction} from "./actions/forgot-password-actions";
import {TIngredientActions} from "./actions/ingredient-actions";
import {TIsLoggedActions} from "./actions/isLogged-actions";
import {TLoginActions, TLoginSuccessAction} from "./actions/login-actions";
import {TLogoutActions, TLogoutSuccessAction} from "./actions/logout-actions";
import {TModalActions} from "./actions/modal-actions";
import {TNewTokenActions, TNewTokenSuccessAction} from "./actions/new-token-actions";
import {TOrderActions, TOrderSuccessAction} from "./actions/order-actions";
import {TRegistrationActions, TRegistrationSuccessAction} from "./actions/registration-actions";
import {TResetPasswordActions, TResetPasswordSuccessAction} from "./actions/reset-password-actions";
import {TUserActions} from "./actions/user-info-actions";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {socketMiddleware} from "./midlewares/socket.midlware";
import {TwsOrderActions, wsActions} from "./actions/socket-actions";
import {TOneOrderActions} from "./actions/one-order-actions";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
: compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

const store = createStore(commonReducer, enhancer);

// Типизация всех экшенов приложения
export type TApplicationActions =
    TAllIngredientsActions
    | TConstructorActions
    | TForgotPasswordActions
    | TIngredientActions
    | TIsLoggedActions
    | TLoginActions
    | TLogoutActions
    | TModalActions
    | TNewTokenActions
    | TOrderActions
    | TRegistrationActions
    | TResetPasswordActions
    | TUserActions
    | TwsOrderActions
    | TOneOrderActions;

export type TSuccessActions  =
    TAllIngredientsSuccessAction
    | TForgotPassworEmailSuccessAction
    | TLoginSuccessAction
    | TLogoutSuccessAction
    | TNewTokenSuccessAction
    | TOrderSuccessAction
    | TRegistrationSuccessAction
    | TResetPasswordSuccessAction


//для useSelector
export type RootState = ReturnType<typeof store.getState>;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
    >;

export type TDispatch = ThunkDispatch<RootState, never, TApplicationActions>

//для всех компонентов
export const useMyDispatch = () => useDispatch<TDispatch>()
export const useMySelector: TypedUseSelectorHook<RootState> = useSelector

export default store;
