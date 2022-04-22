import React, {useState} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyles from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../Modal/Modal";
import {burgerItem} from "../burgerItem";
import PropTypes from "prop-types";

const BurgerConstructor = (props) => {
    const notBun = props.data.filter(ingredient => (ingredient.type !== 'bun'))
    const [visibleOrder, setVisibleOrder] = useState(false);

    const handleOpenModal = () => {
        setVisibleOrder(true);
    }

    const handleCloseModal = () => {
        setVisibleOrder(false);
    }

    const handleEscModal = (isOpen) => {
        setVisibleOrder(isOpen);
    }

    //не понимаю, почему не срабатывает повторное открытие того же элемента после срабатывания клика по overlay
    //отрабатывает корректно только если стоит один обработчик c esc

    const handleOverlayModal = () => {
        setVisibleOrder(false);
    }

    return (
        <section>
            <div className={burgerStyles.bun}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text={`${props.data[0].name} (верх)`}
                price={props.data[0].price}
                thumbnail={props.data[0].image}
            />
            </div>
            <div className={burgerStyles.wrapper}>
                {notBun.map((ingredient) => (
                    <div className={burgerStyles.wrapperItem} key={ingredient._id}>
                        <DragIcon type="primary"/>
                        <div className={burgerStyles.product}>
                            <ConstructorElement
                                type={ingredient.type}
                                isLocked={ingredient.type === 'bun'}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className={burgerStyles.bun}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${props.data[0].name} (низ)`}
                    price={props.data[0].price}
                    thumbnail={props.data[0].image}
                />
            </div>
            <div className={burgerStyles.result}>
                <div className='text text_type_digits-medium'>
                    610
                </div>
                <div className={burgerStyles.diamond}>
                    <CurrencyIcon  type="primary" />
                </div>
                <Button type="primary" size="medium" onClick={handleOpenModal}>
                    Оформить заказ
                </Button>
                {visibleOrder &&
                <Modal handleCloseModal={handleCloseModal}
                       handleEscModal={handleEscModal}
                       handleOverlayModal={handleOverlayModal}
                >
                    <OrderDetails />
                </Modal>
                }
            </div>
        </section>
    )
};

BurgerConstructor.propTypes =  {
    data: PropTypes.arrayOf(burgerItem).isRequired
};

export default BurgerConstructor;
