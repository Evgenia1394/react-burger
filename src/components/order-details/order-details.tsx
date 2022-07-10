import React, {useEffect} from "react";
import orderDetailsStyles from './order-details.module.css';
import doneImage from '../../images/done.svg';
import ErrorPage from "../error-page/error-page";

const OrderDetails = (props: IOrderDetails) => {
    const {orderNumber} = props;

    if (!orderNumber) {
        return <ErrorPage />
    }
    return (
        <>
            <h3 className={orderDetailsStyles.identification}>
                {orderNumber}
            </h3>
            <p className="text text_type_main-medium">
                идентификатор заказа
            </p>
            <div className={orderDetailsStyles.check}>
                <img src={doneImage} alt="order-done"/>
            </div>
            <p className={orderDetailsStyles.status}>
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-small text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    )
}

export interface IOrderDetails {
    orderNumber: string,
}

export default OrderDetails;
