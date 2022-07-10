import {ChangeEvent, FormEvent, useState} from "react";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import authStyles from "./auth.module.css";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {postEmail} from "../services/actions/thunks";
import getCookie from "../utils/get-cookie";

export const ForgotPassword = () => {
    const history = useHistory()
    const [value, setValue] = useState<string>('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const dispatch = useDispatch()

    const recovery = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
         // @ts-ignore
        dispatch(postEmail(value));
        return history.push("/reset-password", { from: '/forgot-password' })
    }

    if (getCookie('token') !== undefined) {
        return (<Redirect to='/'/>)
    }

    return (
        <>
            <div className={authStyles.main}>
                <form className={authStyles.form}
                      onSubmit={recovery}>
                    <p className="text text_type_main-medium">
                        Восстановление пароля
                    </p>
                    <div className={authStyles.input}>
                        <EmailInput

                            onChange={onChange} value={value} name={'email'}/>
                    </div>
                    <Button
                        // @ts-ignore
                        type="submit" size="medium">
                        Восстановить
                    </Button>
                    <div className={authStyles.registration}></div>
                    <p className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль? <Link to='/login'>Войти</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

