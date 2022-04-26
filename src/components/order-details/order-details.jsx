import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import orderDetailsStyles from './order-details.module.css'
import {number} from "prop-types";

const OrderDetails = (props) => {
    return (
        <>
            <h3 className={orderDetailsStyles.identification}>
                {props.orderNumber}
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

OrderDetails.propTypes = {
    orderNumber: number.isRequired,
}

export default OrderDetails;
