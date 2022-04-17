import React from 'react';
import {Button, ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyles from './burger-constructor.module.css';
import substractImage from '../../images/Subtract.svg'
import PropTypes from "prop-types";
import IngredientCard from "../ingredient-card/ingredient-card";

const BurgerConstructor = (props) => {
    const wrapper = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '400px',
        overflowY: 'scroll',
    }
    return (
        <section>
            <div style={wrapper} className={burgerStyles.wrapper}>
                {props.data.map((burger) => (
                    <div className={burgerStyles.wrapperItem} key={burger._id}>
                        <DragIcon type="primary"/>
                        <div className={burgerStyles.product}>
                            <ConstructorElement
                                type={burger.type}
                                isLocked={true}
                                text={burger.name}
                                price={burger.price}
                                thumbnail={burger.image}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className={burgerStyles.result}>
                <div className='text text_type_digits-medium'>
                    610
                </div>
                <div className={burgerStyles.diamond}>
                    <img src={substractImage} alt="subtract"/>
                </div>
                <Button type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
};

export default BurgerConstructor;
