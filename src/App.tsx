import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import data from "./components/utils/data";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import appStyles from './app.module.css'

function App() {
  return (
    <>
      <AppHeader />
      <h1 className={appStyles.titleMargin}>
            Соберите бургер
      </h1>
      <div className={appStyles.wrapper}>
          <BurgerIngredients data={data}/>
          <BurgerConstructor data={data}/>
      </div>
    </>
  );
}

export default App;
