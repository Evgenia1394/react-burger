import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import authStyles from './auth.module.css'
import './styles.css';
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logIn} from "../services/actions/thunks";
import getCookie from "../utils/get-cookie";


export const Login = () => {
    const [form, setValue] = useState({
        email: '',
        password: ''
    });

    const history = useHistory();
    const dispatch = useDispatch();
    const { state } = useLocation();

    const onChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setValue({
            ...form,
            [name]: value,
        });
    }

    const signIn = async () => {
        await dispatch(logIn(form.email, form.password));
        await history.replace({pathname: '/'})
    }

    if (getCookie('token') !== undefined) {
        return (<Redirect to='/'/>)
    }

        return (
            <>
                <div className={authStyles.main}>
                    <div className={authStyles.form}>
                        <p className="text text_type_main-medium">
                            Вход
                        </p>
                        <div className={authStyles.input}>
                            <EmailInput onChange={onChange} value={form.email} name={'email'}/>
                        </div>
                        <PasswordInput onChange={onChange} value={form.password} name={'password'}/>
                        <Button type="primary" size="medium" onClick={signIn}>
                            Войти
                        </Button>
                        <div className={authStyles.registration}></div>
                        <p className="text text_type_main-default text_color_inactive">
                            Вы новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
                        </p>
                        <p className="text text_type_main-default text_color_inactive">
                            Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
                        </p>
                    </div>
                </div>
            </>
        )
}
