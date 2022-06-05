import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import authStyles from './auth.module.css'
import './styles.css';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logIn} from "../services/actions/thunks";


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

    const signIn = (e) => {

        e.preventDefault();
        dispatch(logIn(form.email, form.password));

        if (state?.from) {
            return history.replace(state?.from)
        }
        history.replace({pathname: '/'})
    }

        return (
            <>
                <div className={authStyles.main}>
                    <form className={authStyles.form} onSubmit={signIn}>
                        <p className="text text_type_main-medium">
                            Вход
                        </p>

                            <div className={authStyles.input}>
                                <EmailInput onChange={onChange} value={form.email} name={'email'}/>
                            </div>
                            <PasswordInput onChange={onChange} value={form.password} name={'password'}/>
                            <Button type="submit" size="medium">
                                Войти
                            </Button>

                        <div className={authStyles.registration}></div>
                        <p className="text text_type_main-default text_color_inactive">
                            Вы новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
                        </p>
                        <p className="text text_type_main-default text_color_inactive">
                            Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
                        </p>
                    </form>
                </div>
            </>
        )
}
