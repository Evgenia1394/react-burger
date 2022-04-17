import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import data from "./components/utils/data";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import appStyles from './app.module.css'

function App() {
    const titleMargin = {
        margin: '40px 0 20px 10%',
    };
  return (
    <>
      <AppHeader />
      <div className="text text_type_main-large" style={titleMargin}>
            Соберите бургер
      </div>
      <div className={appStyles.wrapper}>
          <BurgerIngredients />
          <BurgerConstructor data={data}/>
      </div>
    </>
  );
};

export default App;
