import orderFeedStyles from './order-feed.module.css';
import React, {useEffect} from "react";
import {Feed} from "../components/feed/feed";
import {Readiness} from "../components/feed/readiness";
import {useDispatch} from "react-redux";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../services/actions/socket-actions";
import {useMySelector} from "../services/store";

export const OrderFeed = () => {

    const messages = useMySelector((state) => state.wsReducer.messages);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, wsUrl: 'wss://norma.nomoreparties.space/orders/all'})

        return () => {
            dispatch({type: WS_CONNECTION_CLOSED})
        }
    }, [])

    const lastData = messages ? messages[messages.length - 1]?.orders : null;

    return (
            <>
                <h1 className={orderFeedStyles.titleMargin}>
                    Лента заказов
                </h1>
                <div className={orderFeedStyles.wrapper}>
                    {messages.length &&
                        <>
                            <Feed messages={messages} />
                            <Readiness messages={messages} />
                        </>
                    }
                </div>

            </>
    )
}
