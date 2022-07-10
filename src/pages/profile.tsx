import React, {ChangeEvent, FormEvent, useRef, useState} from "react";
import authStyles from "./auth.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, Route, Switch, useHistory, useLocation} from "react-router-dom";
import {editUserInfo, logOut} from "../services/actions/thunks";
import getCookie from "../utils/get-cookie";
import {userActions} from "../services/actions/user-info-actions";
import {isLoggedActions} from "../services/actions/isLogged-actions";
import {IUserForm} from "../types";

import {useMyDispatch, useMySelector} from "../services/store";
import ProtectedAuthRoute from "../components/protected-auth-route";
import {HistoryOrders} from "./history-orders";
import {BurgerСomposition} from "../components/feed/burger-composition";
import Modal from "../components/modal/modal";

export const Profile = () => {

    let feedUserInfo = useMySelector(state => state.userInfoReducer.feedUserInfo);
    const {isShowModal} = useMySelector((state) => state.modalReducer);
    let currentOrder = useMySelector(state => state.oneOrderReducer.oneOrder);

    let name = feedUserInfo.user.name;
    let email = feedUserInfo.user.email;

    const [form, setForm] = useState<IUserForm>({
        name: name,
        email: email,
        password: ""
    });

    const [prevform, setPrevForm] = useState<IUserForm>(form);
    const dispatch = useMyDispatch();
    const history = useHistory();

    const location = useLocation<{background: Location | undefined}>();
    const background = location.state && location.state.background;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setForm({
            ...form,
            [name]: value,
        });

    }
    const inputRef = useRef<HTMLInputElement>(null)
    const onIconClick = () => {
        setTimeout(() => inputRef?.current?.focus(), 0)
        alert('Icon Click Callback')
    }

    const signOut = async () => {

        await dispatch(logOut(getCookie('token')));
        if (!getCookie('token')) {
            await dispatch({type: isLoggedActions.NOT_LOGGED})
        }
        await dispatch({type: userActions.CLEAR_USER});
        await history.replace({pathname: '/login'})
    }

    const editUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const changedFields: IUserForm = {}
        for (let field in form) {
            if (form[field]) {
                changedFields[field] = form[field]
            }
        }

        let validatedFields: IUserForm = {};

        for (let val in changedFields) {
            if (changedFields[val] !== prevform[val]) {
                validatedFields[val] = changedFields[val]
            }
        }

        if (Object.keys(validatedFields).length == 0) {
            return;
        } else {
            dispatch(editUserInfo(getCookie('accessToken'), validatedFields));
            setPrevForm(validatedFields);
        }

        return history.replace({pathname: '/'})
        }

    const resetForm = () => {
        setForm({
            name: name,
            email: email,
            password: ""
        });
    }


    const renderNoModalHistoryOrder = () => {
        return (
            <>
                <BurgerСomposition single={true}/>
            </>
        )
    };

    return (
        <>
            <div className={authStyles.mainProfile}>
                <div className={authStyles.actions}>
                    <div className={authStyles.action}>
                        <NavLink to={'/profile/form'}
                                 activeStyle={{color: '#F2F2F3'}}
                                 className={authStyles.inactiveAction}>
                            <p className="text text_type_main-medium">
                                Профиль
                            </p>
                        </NavLink>
                    </div>
                    <div className={authStyles.action}>
                        <NavLink to={'/profile/orders'}
                                 activeStyle={{color: '#F2F2F3'}}
                                 className={authStyles.inactiveAction}>
                            <p className="text text_type_main-medium">
                                История
                            </p>
                        </NavLink>
                    </div>
                    <div className={authStyles.action}>
                        <NavLink to={'/login'}
                                 activeStyle={{color: '#F2F2F3'}}
                                 className={authStyles.inactiveAction}>
                            <p className="text text_type_main-medium" onClick={signOut}>
                                Выход
                            </p>
                        </NavLink>
                    </div>
                    <p className={authStyles.description}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </div>

                <Switch>
                    <Route path='/profile/form'>
                        <form className={authStyles.formProfile}
                          onSubmit={editUser}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={onChange}
                            icon={'EditIcon'}
                            // @ts-ignore
                            value={form.name}
                            name={'name'}
                            error={false}
                            ref={inputRef}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                        <Input
                            type={'email'}
                            placeholder={'Логин'}
                            onChange={onChange}
                            icon={'EditIcon'}
                            // @ts-ignore
                            value={form.email}
                            name={'email'}
                            error={false}
                            ref={inputRef}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                        <Input
                            type={"password"}
                            placeholder={'Пароль'}
                            onChange={onChange}
                            icon={'EditIcon'}
                            // @ts-ignore
                            value={form.password}
                            name={'password'}
                            error={false}
                            ref={inputRef}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                        <div className={authStyles.buttons}>
                            <Button type="secondary" size="medium" onClick={resetForm}>
                                Отмена
                            </Button>
                            <Button
                                // @ts-ignore
                                type="submit" size="large">
                                Сохранить
                            </Button>
                        </div>
                    </form>
                    </Route>

                    <ProtectedAuthRoute path='/profile/orders' exact={true}>
                        <HistoryOrders />
                    </ProtectedAuthRoute>

                    {!isShowModal &&
                    <Route path="/profile/orders/:id" >
                        {renderNoModalHistoryOrder}
                    </Route>
                    }

                </Switch>

            </div>
        </>
    )
}


