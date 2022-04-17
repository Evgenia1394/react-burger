import React, {useState} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import data from '../utils/data';
import PropTypes from "prop-types";



const BurgerIngredients = () => {
    const [current, setCurrent] = useState('one')
    return (
        <div>
            <div style={{display: 'flex'}}>
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
                    <p className="text text_type_main-medium title"
                       id="bun">
                        Булки
                    </p>
                </div>
                <div className={burgerIngredientsStyles.category}>
                    {data.filter(burger => burger.type === 'bun').map((burger) => (
                        <IngredientCard key={burger._id} data={burger}/>
                    ))}
                </div>
                <p className="text text_type_main-medium"
                   id="sauce"
                >Соусы
                </p>
                <div className={burgerIngredientsStyles.category}>
                {data.filter(burger => burger.type === 'sauce').map((burger) => (
                    <IngredientCard key={burger._id} data={burger}/>
                ))}
                </div>
                <p className="text text_type_main-medium"
                   id="main">
                    Начинки
                </p>
                <div className={burgerIngredientsStyles.category}>
                {data.filter(burger => burger.type === 'main').map((burger) => (
                    <IngredientCard key={burger._id} data={burger} />
                ))}
                </div>
            </div>
        </div>
    )
}

export default BurgerIngredients;
