import {defaultUserInfoState, userInfoReducer} from "./user-info-reducer";
import {userActions} from "../actions/user-info-actions";
import {IUser} from "../../types";

const UserMock = {
    name: 'олежка',
    email: 'оооооо',
    password: '12345678'
}

describe('user-info-reducer', () => {
    it('Установка initialState', () => {
        const result = userInfoReducer(undefined, {})
        expect(result).toEqual(defaultUserInfoState)
    })
    it('Запрос данных о юзере', () => {
        const action = {
            type: userActions.GET_USER
        }
        const result = userInfoReducer(defaultUserInfoState, action)
        expect(result).toEqual({
            ...defaultUserInfoState,
            feedUserInfoRequest: true,
            feedUserInfoFailed: false,
        })
    })

    it('Данные о юзере получены', () => {
        const action = {
            type: userActions.USER_SUCCESS,
            feed: {success: true, user: UserMock}
        }
        const result = userInfoReducer(defaultUserInfoState, action)
        expect(result).toEqual({
            ...defaultUserInfoState,
            feedUserInfo: action.feed,
            feedUserInfoRequest: false,
            isAuthChecked: true
        })
    })

    it('Данные о юзере не получены', () => {
        const action = {
            type: userActions.USER_FAILED,
        }
        const result = userInfoReducer(defaultUserInfoState, action)
        expect(result).toEqual({
            ...defaultUserInfoState,
            feedUserInfoFailed: true,
            feedUserInfoRequest: false,
            isAuthChecked: true
        })
    })

    it('Редактировать юзера', () => {
        const action = {
            type: userActions.EDIT_USER,
            feed: {success: true, user: UserMock}
        }
        const result = userInfoReducer(defaultUserInfoState, action)
        expect(result).toEqual({
            ...defaultUserInfoState,
            feedUserInfo: action.feed,
            feedUserInfoRequest: false,
            isAuthChecked: true
        })
    })

    it('Очистить юзера', () => {
        const action = {
            type: userActions.CLEAR_USER,
            feed: {success: false, user: {}}
        }
        const result = userInfoReducer(defaultUserInfoState, action)
        expect(result).toEqual({
            ...defaultUserInfoState,
            feedUserInfoRequest: false,
            feedUserInfoFailed: false,
            feedUserInfo: {success: false, user: {}},
        })
    })
})
