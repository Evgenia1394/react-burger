import React, {useEffect, useState} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyles from './burger-constructor.module.css';
import PropTypes from "prop-types";
import {burgerItem} from '../burgerItem';
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = (props) => {
    const notBun = props.data.filter(ingredient => (ingredient.type !== 'bun'))
    const [visibleOrder, setVisibleOrder] = useState(false);
    useEffect(() => {
        const closeEsc = document.addEventListener('keydown', function(event) {
            if (event.code == 'Escape') {
                setVisibleOrder(false);
            }
        });
        return () => {
            window.removeEventListener('keydown', closeEsc);
        };
    }, [])

    const handleOpenModalOrder = () => {
        setVisibleOrder(true);
    }

    const handleCloseModalOrder = () => {
        setVisibleOrder(false);
    }

    return (
        <section>
            <div className={burgerStyles.bun}>
            <ConstructorElement
                type={props.data[0].type}
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
                    type={props.data[0].type}
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
                <Button type="primary" size="medium" onClick={handleOpenModalOrder}>
                    Оформить заказ
                </Button>
                {visibleOrder && <OrderDetails handleCloseModal={handleCloseModalOrder}/>}
            </div>
        </section>
    )
};

BurgerConstructor.propTypes =  {
    data: PropTypes.arrayOf(burgerItem).isRequired
};

export default BurgerConstructor;
