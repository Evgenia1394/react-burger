import React, {useEffect, useState} from 'react';
import {
    Button,
    ConstructorElement,
    Counter,
    CurrencyIcon,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyles from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";

import {postOrder} from "../../services/actions/thunks";
import {uuidv4} from "../../utils/uuidv4";
import {ConstructorIngredient} from "../constructor-ingredient/constructor-ingredient";
import getCookie from "../../utils/get-cookie";
import {Redirect, useHistory} from "react-router-dom";
import {OPEN_MODAL} from "../../services/actions/modal-actions";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";

const BurgerConstructor = ({onDropHandler}) => {

    const [visible, setVisible] = useState(false);
    const {constructorIngredient} = useSelector((state) => state.draggableConstructorReducer);

    const {postOrderRequest, postOrderFailed, postOrderFeed} = useSelector((state) => state.orderReducer);
    const {isShowModal} = useSelector((state) => state.modalReducer);

    const [loading, setLoading] = useState(true);

    const [currentIngredient, setCurrentIngredient] = useState(null);

    const notBun = constructorIngredient.filter(ingredient => (ingredient.type !== 'bun' && ingredient.count > 0))
    const bun = constructorIngredient.find(ingredient => (ingredient.type === 'bun'));
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (postOrderFeed) {
            setLoading(false);
        }
    }, [postOrderFeed]);


    const [, dropTarget] = useDrop({
        accept: 'ingredients',
        drop(itemId) {
            onDropHandler(itemId);
        }
    })

    let priceIngredients = 0;
    for (let value of notBun) {
        priceIngredients += value.price * value.count;
    }
    const totalPrice = (bun ? bun.price : 0) * 2 + (notBun.length ? priceIngredients : 0);

    const dataOrder = () => {
        setLoading(true)
        let arrId = [bun._id];
        for (let value of notBun) {
            arrId.push(value._id)
        }

        if (getCookie('token') === undefined) {
            return history.push("/login", { from: '/' })
        }
        return dispatch(postOrder(arrId));
    }

    const handleOpenModal = () => {
         dataOrder();
         dispatch({type: OPEN_MODAL})
         setVisible(true);
    }

    return (
        <section className={burgerStyles.constructor}>
            <div className={burgerStyles.constructorContent}>
                <div className={burgerStyles.bun}>
                    {bun &&
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                    }
                </div>
                <div className={burgerStyles.wrapper} ref={dropTarget}>
                    {notBun.length ?
                        notBun.map((ingredient, id) => {
                            if (ingredient.count > 1) {
                                let array = []
                                let count = ingredient.count
                                for (count; count !== 0; count--) {
                                    array.push(
                                        <div key={uuidv4()}>
                                            <ConstructorIngredient ingredient={ingredient}/>
                                        </div>)
                                }
                                return array
                            }

                            return (
                                <div key={uuidv4()}>
                                    <ConstructorIngredient ingredient={ingredient}/>
                                </div>
                            )
                        }) :
                        <p className={burgerStyles.notIngredients}>
                            Перетащи ингредиенты в бургер
                        </p>
                    }
                </div>
                <div className={burgerStyles.bun}>
                    {bun &&
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                    }
                </div>
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
                {visible && !loading && isShowModal &&
                <Modal
                    setVisible={setVisible}>
                    <OrderDetails orderNumber={postOrderFeed?.order?.number}/>
                </Modal>
                }
            </div>
        </section>
    )
};

BurgerConstructor.propTypes = {
    onDropHandler: PropTypes.func
}

export default BurgerConstructor;
