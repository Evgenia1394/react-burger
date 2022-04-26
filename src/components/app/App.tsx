import React, {useEffect, useState} from 'react';
import '../../App.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from './app.module.css';
import ErrorPage from '../error-page/error-page';
import LoadingPage from "../loading-page/loading-page";
import {IngredientsContext} from '../services/ingredientContext'

function App() {
    const domenUrl = 'https://norma.nomoreparties.space';

    const [state, setState] = useState({
        data: [],
        loading: true,
        error: false
    })

    useEffect(() => {
        const dataUrl = async () => {
            setState({...state, loading: true})
            try {
                const res = await fetch(`${domenUrl}/api/ingredients`);
                if (!res.ok) {
                    throw new Error(`status: ${res.status}`);
                }
                const data = await res.json();
                setState({...state, data: data.data, loading: false})
            } catch (e) {
                setState({...state, loading: false, error: true})
            }
        }
        dataUrl()
    }, [])

    return (
        <>
            {state.error &&
            <ErrorPage/>
            }
            {state.loading &&
            <LoadingPage/>
            }
            {!state.loading && !state.error &&
            <>
                <div className={appStyles.wrapperHeader}>
                    <AppHeader/>
                </div>
                <h1 id="1" className={appStyles.titleMargin}>
                    Соберите бургер
                </h1>
                <div className={appStyles.wrapper}>
                    <IngredientsContext.Provider value={state.data}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </IngredientsContext.Provider>
                </div>
            </>
            }
        </>
    );

};

export default App;
