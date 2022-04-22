import {CheckMarkIcon, CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import orderDetailsStyles from './order-details.module.css'
import PropTypes from "prop-types";

const OrderDetails = () => {
    return (
        <>
                <div className={orderDetailsStyles.identification}>
                    034536
                </div>
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
