import React, {useContext, useEffect, useState} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyles from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {IngredientsContext} from "../services/ingredientContext";
import {OrderContext} from "../services/orderContext";

const BurgerConstructor = () => {
    const [visible, setVisible] = useState(false);
    const ingredients = useContext(IngredientsContext);

    const [orderNumber, setOrderNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const notBun = ingredients.filter(ingredient => (ingredient.type !== 'bun'))
    const bun = ingredients.find(ingredient => (ingredient.type === 'bun'))

    let priceIngredients = 0;
    for (let value of notBun) {
        priceIngredients += value.price
    }
    const totalPrice = bun.price * 2 + priceIngredients;

    const dataOrder = async () => {
        const orderUrl = 'https://norma.nomoreparties.space/api/orders'
        setLoading(true)

        let arrId = [bun._id];
        for (let value of notBun) {
            arrId.push(value._id)
        }

        try {
            const res = await fetch(orderUrl, {
                method: 'POST',
                body: JSON.stringify({ingredients: arrId}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error(`status: ${res.status}`);
            }
            const data = await res.json();
            setLoading(false);
            setOrderNumber(data.order.number)
        } catch (e) {
            setLoading(false);
            setError(true)
        }
    }

    const handleOpenModal = async () => {
        await dataOrder()
        await setVisible(true);
    }

    return (
        <section>
            <div className={burgerStyles.bun}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
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
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <div className={burgerStyles.result}>
                <div className='text text_type_digits-medium'>
                    {totalPrice}
                </div>
                <div className={burgerStyles.diamond}>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="medium" onClick={handleOpenModal}>
                    Оформить заказ
                </Button>
                <OrderContext.Provider value={orderNumber}>
                    {visible &&
                    <Modal
                        setVisible={setVisible}>
                        <OrderDetails/>
                    </Modal>
                    }
                </OrderContext.Provider>
            </div>
        </section>
    )
};

export default BurgerConstructor;
