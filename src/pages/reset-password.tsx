import './styles.css';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useRef, useState} from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import authStyles from "./auth.module.css";
import {useDispatch} from "react-redux";
import {resetPassword} from "../services/actions/thunks";
import getCookie from "../utils/get-cookie";
import {SyntheticEvent} from "../types";

export const ResetPassword = () => {
    const [form, setValue] = useState<IPassword>({
        password: '',
        code: ''
    });

    const dispatch = useDispatch();
    const history = useHistory();
    const { state: stateLocation }: {state: {from: string}} = useLocation();

    const onChange = (e: SyntheticEvent) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setValue({
            ...form,
            [name]: value,
        });
    };

    const inputRef = useRef<HTMLInputElement>(null)
    const onIconClick = () => {
        setTimeout(() => inputRef?.current?.focus(), 0)
        alert('Icon Click Callback')
    }

    const resetRequest = (e: SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(resetPassword(form.password, form.code));
    }

    if (getCookie('token') !== undefined) {
        history.goBack();
    }

    if (stateLocation?.from !== '/forgot-password') {
        history.replace({pathname: '/'})
    }


    return (
        <>
            <div className={authStyles.main}>
                <form className={authStyles.form}
                    // @ts-ignore
                      onSubmit={resetRequest}>
                    <p className="text text_type_main-medium">
                        Восстановление пароля
                    </p>
                    <PasswordInput
                        // @ts-ignore
                        onChange={onChange} value={form.password} name={'password'} />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        // @ts-ignore
                        onChange={onChange}
                        icon={'CurrencyIcon'}
                        value={form.code}
                        name={'code'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />

                    <Button
                        // @ts-ignore
                        type="submit" size="medium">
                        Сохранить
                    </Button>
                    <p className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль? <Link to='/login'>Войти</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

interface IPassword {
    password: string,
    code: string
}
