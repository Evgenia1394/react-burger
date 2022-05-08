import React, {useState} from 'react';
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
import {useDrop} from "react-dnd";
import {DECREASE_COUNT, SORT_INGREDIENT} from "../../services/actions/allActions";
import {postOrder} from "../../services/thunks/thunks";

const BurgerConstructor = (props) => {

    const [visible, setVisible] = useState(false);
    const {constructorIngredient} = useSelector((state) => state.draggableConstructorReducer);

    const {postOrderRequest, postOrderFailed, postOrderFeed} = useSelector((state) => state.orderReducer);

    const [loading, setLoading] = useState(false);

    const [currentIngredient, setCurrentIngredient] = useState(null);

    const notBun = constructorIngredient.filter(ingredient => (ingredient.type !== 'bun')).filter(ingredient => ingredient.count > 0);
    const bun = constructorIngredient.find(ingredient => (ingredient.type === 'bun'));
    const dispatch = useDispatch();

    const [, dropTarget] = useDrop({
        accept: 'ingredients',
        drop(itemId) {
            props.onDropHandler(itemId);
        }
    })

    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const handleClose = (id) => {
        dispatch({
            type: DECREASE_COUNT,
            id: id
        })
    }

    let priceIngredients = 0;
    for (let value of notBun) {
        priceIngredients += value.price * value.count;
    }
    const totalPrice = (bun ? bun.price : 0) * 2 + (notBun.length ? priceIngredients : 0);

    const dataOrder = async () => {
        await setLoading(true)
        let arrId = [bun._id];
        for (let value of notBun) {
            arrId.push(value._id)
        }
        await dispatch(postOrder(arrId));
    }

    const handleOpenModal = async () => {
        await dataOrder();
        await setLoading(false);
        await setVisible(true);
    }

//функции для внутреннего днд
    const dragStartHandler = (e, dragIngredient) => {
        setCurrentIngredient(dragIngredient)
    }
    const dragOverHandler = (e, ingredient) => {
        e.preventDefault();
    }
    const dropHandler = (e, dropIngredient) => {
        e.preventDefault();
        dispatch({
            type: SORT_INGREDIENT,
            payload: {
                dragIngredient: currentIngredient,
                dropIngredient: dropIngredient,
            }
        })
    }
    const sortIngredients = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
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
                <div className={burgerStyles.wrapper}
                     ref={dropTarget}>
                    {notBun.length ?
                        notBun.sort(sortIngredients).map((ingredient) => (
                            <div className={burgerStyles.wrapperItem}
                                 key={uuidv4()}
                                onDragStart={e => dragStartHandler(e, ingredient)}
                                onDragOver={e => dragOverHandler(e)}
                                onDrop={e => dropHandler(e, ingredient)}
                            >
                                <div className={burgerStyles.dragIcon}>
                                    <DragIcon type="primary"/>
                                </div>
                                <div className={burgerStyles.product}
                                >
                                    <ConstructorElement
                                        draggable={true}
                                        handleClose={e => handleClose(ingredient._id)}
                                        type={ingredient.type}
                                        isLocked={ingredient.type === 'bun'}
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image}
                                    />
                                    <div className={burgerStyles.ingredientCount}>
                                        <Counter count={ingredient.count} size="small" />
                                    </div>
                                </div>
                            </div>
                        )) :
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
                {visible &&
                <Modal
                    setVisible={setVisible}>
                    <OrderDetails orderNumber={postOrderFeed.order.number}/>
                </Modal>
                }
            </div>
        </section>
    )
};

export default BurgerConstructor;
