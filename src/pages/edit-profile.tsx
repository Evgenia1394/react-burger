import React from 'react'
import {Switch} from "react-router-dom";
import ProtectedAuthRoute from "../components/protected-auth-route";
import {HistoryOrders} from "./history-orders";
import authStyles from "./auth.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";


export const EditProfile: React.FC = (props) => {

    return (
        <div>
            <h2>asdafafsafafafaffasf</h2>
            <Switch>

                <ProtectedAuthRoute path='/profile/orders' exact={true}>
                    <HistoryOrders />
                </ProtectedAuthRoute>

                <ProtectedAuthRoute path='/profile' exact={true}>
                    {/*<form className={authStyles.formProfile}*/}
                    {/*      onSubmit={editUser}>*/}
                    {/*    <Input*/}
                    {/*        type={'text'}*/}
                    {/*        placeholder={'Имя'}*/}
                    {/*        onChange={onChange}*/}
                    {/*        icon={'EditIcon'}*/}
                    {/*        // @ts-ignore*/}
                    {/*        value={form.name}*/}
                    {/*        name={'name'}*/}
                    {/*        error={false}*/}
                    {/*        ref={inputRef}*/}
                    {/*        onIconClick={onIconClick}*/}
                    {/*        errorText={'Ошибка'}*/}
                    {/*        size={'default'}*/}
                    {/*    />*/}
                    {/*    <Input*/}
                    {/*        type={'email'}*/}
                    {/*        placeholder={'Логин'}*/}
                    {/*        onChange={onChange}*/}
                    {/*        icon={'EditIcon'}*/}
                    {/*        // @ts-ignore*/}
                    {/*        value={form.email}*/}
                    {/*        name={'email'}*/}
                    {/*        error={false}*/}
                    {/*        ref={inputRef}*/}
                    {/*        onIconClick={onIconClick}*/}
                    {/*        errorText={'Ошибка'}*/}
                    {/*        size={'default'}*/}
                    {/*    />*/}
                    {/*    <Input*/}
                    {/*        type={"password"}*/}
                    {/*        placeholder={'Пароль'}*/}
                    {/*        onChange={onChange}*/}
                    {/*        icon={'EditIcon'}*/}
                    {/*        // @ts-ignore*/}
                    {/*        value={form.password}*/}
                    {/*        name={'password'}*/}
                    {/*        error={false}*/}
                    {/*        ref={inputRef}*/}
                    {/*        onIconClick={onIconClick}*/}
                    {/*        errorText={'Ошибка'}*/}
                    {/*        size={'default'}*/}
                    {/*    />*/}
                    {/*    <div className={authStyles.buttons}>*/}
                    {/*        <Button type="secondary" size="medium" onClick={resetForm}>*/}
                    {/*            Отмена*/}
                    {/*        </Button>*/}
                    {/*        <Button*/}
                    {/*            // @ts-ignore*/}
                    {/*            type="submit" size="large">*/}
                    {/*            Сохранить*/}
                    {/*        </Button>*/}
                    {/*    </div>*/}
                    {/*</form>*/}
                    <h1>asdadasd</h1>
                </ProtectedAuthRoute>

            </Switch>
        </div>
    )
}
