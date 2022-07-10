import React, {useEffect, useState} from 'react';
import '../../App.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from './app.module.css';
import ErrorPage from '../error-page/error-page';
import LoadingPage from "../loading-page/loading-page";
import {addIngredient, getFeed} from "../../services/actions/thunks";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import { Route, Switch, useLocation} from 'react-router-dom';
import {Login} from "../../pages/login";
import {ForgotPassword} from "../../pages/forgot-password";
import {Registration} from "../../pages/registration";
import {ResetPassword} from "../../pages/reset-password";
import {Profile} from "../../pages/profile";
import ProtectedAuthRoute from "../protected-auth-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {IBurgerItem} from "../../types";
import {OrderFeed} from "../../pages/order-feed";
import {BurgerСomposition} from "../feed/burger-composition";
import {useMyDispatch, useMySelector} from "../../services/store";

function App() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const location = useLocation<{background: Location | undefined}>();

    const allIngredients = useMySelector((state) => state.allIngredientsReducer);
    let feedIngredientsRequest = allIngredients.feedIngredientsRequest;
    let feedIngredientsFailed = allIngredients.feedIngredientsFailed;
    let feedIngredients = allIngredients.feedIngredients;

    let currentOrder = useMySelector(state => state.oneOrderReducer.oneOrder);

    const {detailsIngredient} = useMySelector((state) => state.ingredientReducer);
    let image = detailsIngredient?.image;
    let name = detailsIngredient?.name;
    let calories = detailsIngredient?.calories;
    let proteins = detailsIngredient?.proteins;
    let fat = detailsIngredient?.fat;
    let carbohydrates = detailsIngredient?.carbohydrates;


    const {ingredientReady} = useMySelector((state) => state.ingredientReducer)

    const {isShowModal} = useMySelector((state) => state.modalReducer);

    const {constructorIngredient} = useMySelector((state) => state.draggableConstructorReducer);

    const dispatch = useMyDispatch();

    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(getFeed());
    }, [dispatch])

    useEffect(() => {
        if (feedIngredients) {
            setIsLoading(false)
        }
    }, [feedIngredientsRequest, feedIngredients])

    const onDropHandler = (item: IBurgerItem) => {
        dispatch(addIngredient(item, constructorIngredient))
    };

    if (isLoading) {
        return <LoadingPage/>;
    }

    const renderNoModalIngredient = () => {
        const idNoModalIngredient = location.pathname.split('/')[2];

        const item: IBurgerItem | undefined = feedIngredients?.data?.find((item) => item._id === idNoModalIngredient);

        return (
            <>
            {!isLoading && item &&
                <IngredientDetails
                    src={item.image}
                    name={item.name}
                    calories={item.calories}
                    proteins={item.proteins}
                    fat={item.fat}
                    carbohydrates={item.carbohydrates}
                    single={true}
                />
        }</>
    )
    }

    const renderNoModalOrder = () => {
        return (
            <>
                {!isLoading &&
                    <BurgerСomposition single={true}/>
                }</>
        )
    }

    return (
        <>
            {!isLoading &&
            <>
                {feedIngredientsFailed &&
                <ErrorPage/>
                }
                {feedIngredientsRequest &&
                <LoadingPage/>
                }
                {!feedIngredientsRequest && !feedIngredientsFailed &&
                <>
                        <div className={appStyles.wrapperHeader}>
                            <AppHeader/>
                        </div>

                        {isShowModal && ingredientReady && background
                        && image && name && calories && proteins && fat && carbohydrates &&
                        <Route path="/ingredients/:id">
                            <Modal
                                isIngredientDetail={true}
                            >
                                <IngredientDetails
                                    src={image}
                                    name={name}
                                    calories={calories}
                                    proteins={proteins}
                                    fat={fat}
                                    carbohydrates={carbohydrates}
                                />
                            </Modal>
                        </Route>
                        }


                        {isShowModal && background &&
                            <Route path="/feed/:id" exact={true}>
                                <Modal>
                                    <BurgerСomposition currentOrder={currentOrder}/>
                                </Modal>
                            </Route>
                        }

                        {isShowModal && background &&
                        <Route path="/profile/orders/:id" exact={true}>
                            <Modal>
                                <BurgerСomposition currentOrder={currentOrder}/>
                            </Modal>
                        </Route>
                        }


                        <Switch>
                            <Route path="/" exact={true}>
                                <DndProvider backend={HTML5Backend}>

                                    <h1 id="1" className={appStyles.titleMargin}>
                                        Соберите бургер
                                    </h1>
                                    <div className={appStyles.wrapper}>
                                        <BurgerIngredients/>
                                        <BurgerConstructor onDropHandler={onDropHandler}/>
                                    </div>
                                </DndProvider>
                            </Route>

                            <ProtectedAuthRoute onlyUnAuth={true} path="/login" exact={true}>
                                <Login/>
                            </ProtectedAuthRoute>

                            <ProtectedAuthRoute onlyUnAuth={true} path="/forgot-password" exact={true}>
                                <ForgotPassword/>
                            </ProtectedAuthRoute>

                            <ProtectedAuthRoute onlyUnAuth={true} path="/register" exact={true}>
                                <Registration/>
                            </ProtectedAuthRoute>

                            <ProtectedAuthRoute onlyUnAuth={true} path="/reset-password" exact={true}>
                                <ResetPassword/>
                            </ProtectedAuthRoute>

                            <ProtectedAuthRoute path="/profile">
                                <Profile/>
                            </ProtectedAuthRoute>

                            <Route path="/feed" exact={true}>
                                <OrderFeed />
                            </Route>

                            {!isShowModal &&
                                <Route path="/ingredients/:id" exact={true}>
                                    {renderNoModalIngredient}
                                </Route>
                            }

                            {!isShowModal &&
                            <Route path="/feed/:id" exact={true}>
                                {renderNoModalOrder}
                            </Route>
                            }

                        </Switch>
                </>
                }
            </>
            }
        </>
    );
}
export default App;

