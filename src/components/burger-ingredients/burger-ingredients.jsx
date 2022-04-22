import React, {useState} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import PropTypes from "prop-types";
import {burgerItem} from '../burgerItem';


const BurgerIngredients = (props) => {
    const [current, setCurrent] = useState('Булки');
    const buns = props.data.filter(ingredient => ingredient.type === 'bun');
    const sauces = props.data.filter(ingredient => ingredient.type === 'sauce');
    const mains = props.data.filter(ingredient => ingredient.type === 'main');

    return (
        <div>
            <div className={burgerIngredientsStyles.wrapperTab}>
                <a href="#bun">
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                </a>
                <a href="#sauce">
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                </a>
                <a href="#main">
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
                </a>
            </div>
            <div className={burgerIngredientsStyles.content}>
                <div className={burgerIngredientsStyles.title}>
                    <h2 className="text text_type_main-medium title"
                       id="bun">
                        Булки
                    </h2>
                </div>
                <div className={burgerIngredientsStyles.category}>
                {buns.map((burger) => (
                        <IngredientCard key={burger._id} data={burger}/>
                    ))}
                </div>
                <h2 className="text text_type_main-medium"
                   id="sauce"
                >Соусы
                </h2>
                <div className={burgerIngredientsStyles.category}>
                {sauces.map((burger) => (
                    <IngredientCard key={burger._id} data={burger}/>
                ))}
                </div>
                <h2 className="text text_type_main-medium"
                   id="main">
                    Начинки
                </h2>
                <div className={burgerIngredientsStyles.category}>
                {mains.map((burger) => (
                    <IngredientCard key={burger._id} data={burger} />
                ))}
                </div>
            </div>
        </div>
    )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerItem).isRequired
};

export default BurgerIngredients;
