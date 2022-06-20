import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import authStyles from "./auth.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useHistory} from "react-router-dom";
import {editUserInfo, logOut} from "../services/actions/thunks";
import getCookie from "../utils/get-cookie";
import {CLEAR_USER} from "../services/actions/user-info-actions";
import {NOT_LOGGED} from "../services/actions/isLogged-actions";
import {IForm, SyntheticEvent} from "../types";

export const Profile = () => {
    // @ts-ignore
    let {feedUserInfoRequest, feedUserInfoFailed, feedUserInfo} = useSelector(state => state.userInfoReducer);
    const [form, setForm] = useState<IForm>({
        name: feedUserInfo.user.name,
        email: feedUserInfo.user.email,
        password: ""
    });

    const [prevform, setPrevForm] = useState<IForm>(form);
    const dispatch = useDispatch();
    const history = useHistory();

    const onChange = (e: SyntheticEvent) => {
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
        // @ts-ignore
        await dispatch(logOut(getCookie('token')));
        if (!getCookie('token')) {
            await dispatch({type: NOT_LOGGED})
        }
        await dispatch({type: CLEAR_USER});
        await history.replace({pathname: '/login'})
    }

    const editUser = (e: SyntheticEvent) => {
        e.preventDefault();
        const changedFields: IForm = {}
        for (let field in form) {
            if (form[field]) {
                changedFields[field] = form[field]
            }
        }

        let validatedFields: IForm = {};

        for (let val in changedFields) {
            if (changedFields[val] !== prevform[val]) {
                validatedFields[val] = changedFields[val]
            }
        }

        if (Object.keys(validatedFields).length == 0) {
            return;
        } else {
            // @ts-ignore
            dispatch(editUserInfo(getCookie('accessToken'), validatedFields));
            setPrevForm(validatedFields);
        }

        return history.replace({pathname: '/'})
        }

    const resetForm = () => {
        setForm({
            name: feedUserInfo.user.name,
            email: feedUserInfo.user.email,
            password: ""
        });
    }

    // @ts-ignore
    return (
        <>
            <div className={authStyles.mainProfile}>
                <div className={authStyles.actions}>
                    <div className={authStyles.action}>
                        <NavLink to={'profile'}
                                 activeStyle={{color: '#F2F2F3'}}
                                 className={authStyles.inactiveAction}>
                            <p className="text text_type_main-medium">
                                Профиль
                            </p>
                        </NavLink>
                    </div>
                    <div className={authStyles.action}>
                        <NavLink to={'profile/orders'}
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

                <form className={authStyles.formProfile}
                    // @ts-ignore
                      onSubmit={editUser}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        // @ts-ignore
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
                        // @ts-ignore
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
                        type={'text'}
                        placeholder={'Пароль'}
                        // @ts-ignore
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
                        // @ts-ignore
                        type={'password'}
                    />
                    <div className={authStyles.buttons}>
                        <Button type="primary" size="medium" onClick={resetForm}>
                            Отмена
                        </Button>
                        <Button
                            // @ts-ignore
                            type="submit" size="large">
                            Сохранить
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

