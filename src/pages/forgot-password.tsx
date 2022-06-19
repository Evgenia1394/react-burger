import {useState} from "react";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import authStyles from "./auth.module.css";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {postEmail} from "../services/actions/thunks";
import getCookie from "../utils/get-cookie";
import {SyntheticEvent} from "../types";

export const ForgotPassword = () => {
    const history = useHistory()
    const [value, setValue] = useState<string>('');

    const onChange = (e: SyntheticEvent) => {
        setValue(e.target.value);
    }

    const dispatch = useDispatch()

    const recovery = (e: SyntheticEvent) => {
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
                    // @ts-ignore
                      onSubmit={recovery}>
                    <p className="text text_type_main-medium">
                        Восстановление пароля
                    </p>
                    <div className={authStyles.input}>
                        <EmailInput
                            // @ts-ignore
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

