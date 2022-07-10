import burgerCompositionStyle from './burger-composition.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useEffect, useMemo, useState} from "react";
import {useHistory} from "react-router-dom";
import {useMyDispatch, useMySelector} from "../../services/store";
import {getOneOrder} from "../../services/actions/thunks";
import {WS_CONNECTION_START} from "../../services/actions/socket-actions";
import LoadingPage from "../loading-page/loading-page";
import {IBurgerItem, TOrderProps} from "../../types";
import getCookie from "../../utils/get-cookie";

export const BurgerСomposition: FC<any> = (props) => {

    const messages = useMySelector((state) => state.wsReducer.messages);
    const isWsConnected = useMySelector((state) => state.wsReducer.wsConnected);
    const wsLoadingConnect = useMySelector((state) => state.wsReducer.wsLoadingConnect);
    const history = useHistory()
    const dispatch = useMyDispatch();
    const accessToken = getCookie('accessToken')?.split(' ')[1];

    let id: string;
    if (history.location.pathname.split("/").length === 3) {
        id = history.location.pathname.split("/")[2];//в ленте

    } else {
        id = history.location.pathname.split("/")[3];//в истории

    }


    const currentOrder = useMySelector(state => state.oneOrderReducer.oneOrder?.orders[0]);
    const loading = useMySelector(state => state.oneOrderReducer.requestOneOrder);

    const allIngredients = useMySelector(state => state.allIngredientsReducer.feedIngredients.data);

    useEffect(() => {
        if (props.number) {
            dispatch(getOneOrder(props.number));
        } else {
            console.log(history.location.pathname.split("/").length);
            if (!isWsConnected && history.location.pathname.split("/").length === 3) {
                dispatch({type: WS_CONNECTION_START, wsUrl: 'wss://norma.nomoreparties.space/orders/all'});
            }
            if (!isWsConnected && history.location.pathname.split("/").length === 4) {
                dispatch({type: WS_CONNECTION_START, wsUrl: `wss://norma.nomoreparties.space/orders?token=${accessToken}`}
                )
            }
        }
    }, []);

    useEffect(() => {
        if (!wsLoadingConnect && isWsConnected && messages.length) {
            const currentElem = messages[messages.length - 1].orders.find(order => order._id === id);
            if (currentElem) {
                dispatch(getOneOrder(currentElem.number));
            }
        }
    }, [messages])

    const ingredientsWithoutRepeat: Array<String> = [];
    currentOrder?.ingredients.forEach((elem: string) => {
        if (!ingredientsWithoutRepeat.includes(elem)) {
            ingredientsWithoutRepeat.push(elem)
        }
    }
    )

    const completeIngredients: IBurgerItem[] = [];
    ingredientsWithoutRepeat.forEach(elem => {
        const completeIngredient = allIngredients?.find(item => item._id === elem)
        if (completeIngredient) {
            completeIngredients.push(completeIngredient)
        }
    })

    if (loading) {
        return <LoadingPage />
    }

    const sortedForCount: {[key: string]: number} | undefined = currentOrder?.ingredients.reduce((acc: {[key: string]: number}, item) => {
        acc[item] = acc[item] ? acc[item] + 1 : 1; // если элемент уже был, то прибавляем 1, если нет - устанавливаем 1
        return acc;
    }, {});

    const counter = (_id: string) => {
        return sortedForCount?.hasOwnProperty(_id) ? sortedForCount[_id] : 0;
    }


    const completeIngredientsForPrice: IBurgerItem[] = [];
    currentOrder?.ingredients.forEach(elem => {
        const elementsForPrice = allIngredients?.find(item => item._id === elem)
        if (elementsForPrice) {
            completeIngredientsForPrice.push(elementsForPrice)
        }
    })

    let total = 0;
    completeIngredientsForPrice.forEach(elem => {
        total += elem.price
    })

    return (
        <>
            {currentOrder && !loading &&
            <div className={burgerCompositionStyle.container}>
                <div className={props.single ? burgerCompositionStyle.wrapper : burgerCompositionStyle.wrapperModal}>
                    <div className={burgerCompositionStyle.number}>
                        <p className="text text_type_digits-default">
                            {`#${currentOrder.number}`}
                        </p>
                    </div>
                    <div className={burgerCompositionStyle.title}>
                        <p className="text text_type_main-medium">
                            {currentOrder.name}
                        </p>
                    </div>
                    <div className={burgerCompositionStyle.status}>
                        <p className={burgerCompositionStyle.statusText}>
                            Выполнен: {currentOrder.status === 'done' ? 'да' : 'нет'}
                        </p>
                    </div>
                    <div className={burgerCompositionStyle.compositionTitle}>
                        <p className="text text_type_main-medium">
                            Состав:
                        </p>
                    </div>
                    <div className={props.single ? burgerCompositionStyle.description : burgerCompositionStyle.descriptionModal}>

                        {completeIngredients.map((ingredient, index) => {
                            return (
                                <div className={burgerCompositionStyle.descriptionIngredient} key={index}>
                                    <div className={burgerCompositionStyle.imgAndName}>
                                        <div className={burgerCompositionStyle.ingImagesBackground}>
                                            <img src={ingredient.image} />
                                        </div>
                                        <div>
                                            <p className="text text_type_main-default">
                                                {ingredient.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={burgerCompositionStyle.amount}>
                                        <p className="text text_type_digits-default">{counter(ingredient._id)}*{ingredient.price}</p>
                                        <CurrencyIcon type="primary"/>
                                    </div>
                                </div>
                            )
                            })
                        }
                    </div>

                    <div className={burgerCompositionStyle.sum}>
                        <div className={burgerCompositionStyle.data}>
                            <p className="text text_type_main-default text_color_inactive">
                                {currentOrder.createdAt}
                            </p>
                        </div>
                        <div className={burgerCompositionStyle.total}>
                            <p className="text text_type_digits-default">
                                {total}
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>

                </div>
            </div>
            }
        </>
    )
}

