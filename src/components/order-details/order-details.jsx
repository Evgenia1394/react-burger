import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useContext} from "react";
import orderDetailsStyles from './order-details.module.css'
import {OrderContext} from "../services/orderContext";

const OrderDetails = () => {
    const orderNumber = useContext(OrderContext);
    return (
        <>
            <h3 className={orderDetailsStyles.identification}>
                {orderNumber}
            </h3>
            <p className="text text_type_main-default">
                идентификатор заказа
            </p>
            <div className={orderDetailsStyles.check}>
                <CheckMarkIcon type="primary"/>
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

export default OrderDetails;
