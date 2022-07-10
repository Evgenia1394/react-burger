import feedStyles from "./feed-style.module.css";
import React, {FC} from "react";
import {IAllOrdersProps, TOrderProps} from "../../types";

export const Readiness: FC<IAllOrdersProps> = ({messages}) => {

    const lastData = messages ? messages[messages.length - 1].orders : null;

    const doneOrders = lastData ? lastData.filter(order => order.status === 'done').slice(-20) : null;
    const workOrders = lastData ? lastData.filter(order => order.status === 'work').slice(-20) : null;

    const doneAllTime = messages ? messages[messages.length - 1].total : null;
    const doneToday = messages ? messages[messages.length - 1].totalToday : null;
    const MAX = 10;

    return (
        <>{messages &&
            <div className={feedStyles.wrapperTab}>
                <div className={feedStyles.content}>
                    <div className={feedStyles.readinessContent}>
                        <div className={feedStyles.status}>
                            <div className={feedStyles.statusColumn}>
                                <div className={feedStyles.statusTitle}>
                                    <p className="text text_type_main-medium">
                                        Готовы:
                                    </p>
                                </div>
                                <div className={feedStyles.numbersContainer}>
                                    {doneOrders && doneOrders.map((order: TOrderProps) => (
                                        <div key={order._id} className={feedStyles.readyNumbers}>{order.number}</div>
                                    ))}
                                </div>
                            </div>
                            <div className={feedStyles.statusColumn}>
                                <div className={feedStyles.statusTitle}>
                                    <p className="text text_type_main-medium">
                                        В работе:
                                    </p>
                                </div>
                                <div className={feedStyles.numbersContainer}>
                                    {workOrders && workOrders.map((order: TOrderProps) => (
                                        <div key={order._id} className={feedStyles.workNumbers}>{order.number}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text text_type_main-medium">
                                Выполнено за все время:
                            </p>
                            <p className={feedStyles.ordersAmount}>{doneAllTime}</p>
                        </div>
                        <div>
                            <p className="text text_type_main-medium">
                                Выполнено за все сегодня:
                            </p>
                            <p className={feedStyles.ordersAmount}>{doneToday}</p>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}
