import orderFeedStyles from './order-feed.module.css';
import React, {useEffect} from "react";
import {Feed} from "../components/feed/feed";
import {Readiness} from "../components/feed/readiness";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START, wsActions, wsInit} from "../services/actions/socket-actions";
import {useMyDispatch, useMySelector} from "../services/store";
import {baseWsUrl} from "../utils/burger-api";

export const OrderFeed = () => {

    const messages = useMySelector((state) => state.wsReducer.messages);

    const dispatch = useMyDispatch();

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, wsUrl: `${baseWsUrl}/all`})

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
