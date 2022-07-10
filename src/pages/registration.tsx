import {ChangeEvent, FormEvent, useRef, useState} from "react";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import './styles.css';
import authStyles from "./auth.module.css";
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registrationNew} from "../services/actions/thunks";
import getCookie from "../utils/get-cookie";
import {SyntheticEvent} from "../types";
import {useMyDispatch} from "../services/store";

export const Registration = () => {
    const [form, setValue] = useState<IRegistration>({
        name: '',
        email: '',
        password: ''
    });
    const history = useHistory();

    const dispatch = useMyDispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setValue({
            ...form,
            [name]: value,
        });
    }
    const inputRef = useRef<HTMLInputElement>(null)
    const onIconClick = () => {
        setTimeout(() => inputRef?.current?.focus(), 0)
        alert('Icon Click Callback')
    }

    const registration = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await dispatch(registrationNew(form.email, form.password, form.name));
      await history.replace({pathname: '/'})
    }

    if (getCookie('token') !== undefined) {
        history.goBack()
    }

    return (
        <>
            <div className={authStyles.main}>
                <form className={authStyles.form}

                      onSubmit={registration}>
                    <p className="text text_type_main-medium">
                        Регистрация
                    </p>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
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
                        <EmailInput
                            onChange={onChange} value={form.email} name={'email'}/>
                    </div>
                    <PasswordInput

                        onChange={onChange} value={form.password} name={'password'} />
                    <Button
                        // @ts-ignore
                        type="submit" size="medium">
                        Зарегистрироваться
                    </Button>
                    <div className={authStyles.registration}></div>
                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы? <Link to='/login'>Войти</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export interface IRegistration {
    name: string,
    email: string,
    password: string
}
