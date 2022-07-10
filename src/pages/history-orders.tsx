import {Feed} from "../components/feed/feed";
import {useMyDispatch, useMySelector} from "../services/store";
import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../services/actions/socket-actions";
import getCookie from "../utils/get-cookie";
import feedStyles from "../components/feed/feed-style.module.css";
import {TOrderProps} from "../types";
import {FeedCard} from "../components/feed/feed-card";
import {getOneOrder} from "../services/actions/thunks";
import {modalActions} from "../services/actions/modal-actions";

export const HistoryOrders = () => {

    const messages = useMySelector((state) => state.wsReducer.messages);
    const wsConnected = useMySelector((state) => state.wsReducer.wsConnected);
    const wsLoadingConnect = useMySelector((state) => state.wsReducer.wsLoadingConnect);

    const dispatch = useMyDispatch();

    const accessToken = getCookie('accessToken')?.split(' ')[1];

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, wsUrl: `wss://norma.nomoreparties.space/orders?token=${accessToken}`})
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED})
        }
    }, [])


    const openOrder = async (number: number) => {
        await dispatch(getOneOrder(number, true));
        dispatch({
            type: modalActions.OPEN_MODAL,
        });
    }

    let lastData;

    if (wsConnected && !wsLoadingConnect) {
        if (messages.length === 1) {
            lastData = messages ? messages[0]?.orders : null;
        } else {
            lastData = messages ? messages[messages.length - 1]?.orders : null;
        }
    }

    return (
        <>
            <div className={feedStyles.wrapperTab}>
                <div className={feedStyles.contentHistory}>
                    <div className={feedStyles.allCardOrders}>
                    {lastData && lastData.map((order: TOrderProps) => (
                        <div key={order._id} onClick={(e) => openOrder(order.number)}>
                            <FeedCard {...order} isHistory={true}/>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </>
    )
}
