import {useRef, useState} from "react";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import './styles.css';
import authStyles from "./auth.module.css";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registration, registrationNew} from "../services/actions/thunks";
import {baseUrl} from "../utils/burger-api";
import getCookie from "../utils/get-cookie";

export const Registration = () => {
    const [form, setValue] = useState({
        name: '',
        email: '',
        password: ''
    });
    const history = useHistory();

    const dispatch = useDispatch();

    const onChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setValue({
            ...form,
            [name]: value,
        });
    }
    const inputRef = useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const registration = async () => {
      await dispatch(registrationNew(form.email, form.password, form.name));
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
                        Регистрация
                    </p>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        // onChange={e => setValue(e.target.value)}
                        onChange={onChange}
                        icon={'CurrencyIcon'}
                        value={form.name}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <div className={authStyles.input}>
                        <EmailInput onChange={onChange} value={form.email} name={'email'}/>
                    </div>
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                    <Button type="primary" size="medium" onClick={registration}>
                        Зарегистрироваться
                    </Button>
                    <div className={authStyles.registration}></div>
                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы? <Link to='/login'>Войти</Link>
                    </p>
                </div>
            </div>
        </>
    )
}
