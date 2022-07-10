import feedStyles from "./feed-style.module.css";
import React, {FC} from "react";
import {FeedCard} from "./feed-card";
import {IAllOrdersProps, TOrderProps} from "../../types";
import {useMyDispatch, useMySelector} from "../../services/store";
import {getOneOrder} from "../../services/actions/thunks";
import {modalActions, OPEN_MODAL} from "../../services/actions/modal-actions";


export const Feed: FC<IAllOrdersProps> = ({messages}) => {

    const dispatch = useMyDispatch();
    const allIngredients = useMySelector((state) => state.allIngredientsReducer);
    let feedIngredients = allIngredients.feedIngredients;

    const openOrder = async (number: number) => {
        await dispatch(getOneOrder(number));
        dispatch({
            type: modalActions.OPEN_MODAL,
        });
    }

    const lastData = messages ? messages[messages.length - 1].orders : null;
    return (
        <>
            {messages &&
            <div className={feedStyles.wrapperTab}>
                <div className={feedStyles.content}>
                    <div className={feedStyles.allCardOrders}></div>

                    {lastData && lastData.map((order: TOrderProps) => (
                        <div key={order._id} onClick={(e) => openOrder(order.number)}>
                            <FeedCard {...order}/>
                        </div>
                    ))}
                </div>
            </div>
            }
        </>
    )
};


