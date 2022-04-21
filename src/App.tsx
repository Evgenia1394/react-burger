import React, {useEffect, useState} from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import data from "./components/utils/data";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import appStyles from './app.module.css';
import ErrorPage from './components/error-page/error-page';
import Modal from './components/Modal/Modal'
import LoadingPage from "./components/loading-page/loading-page";

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
                throw e;
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
                <LoadingPage />
            }
            {!state.loading && !state.error &&
            <>
                <AppHeader/>
                <h1 id="1" className={appStyles.titleMargin}>
                    Соберите бургер
                </h1>
                <div className={appStyles.wrapper}>
                    <BurgerIngredients data={state.data}/>
                    <BurgerConstructor data={state.data}/>
                </div>
            </>
            }
        </>
    );

}

export default App;
