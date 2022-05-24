import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css';
import {NavLink} from "react-router-dom";


const AppHeader = () => {
    return (
        <section>
            <header className={headerStyles.header}>
                <nav className={headerStyles.nav}>
                    <div className={headerStyles.two}>

                        <NavLink to={''}
                                 activeStyle={{color: '#F2F2F3'}}
                                 className={headerStyles.item}
                                 exact={true}
                        >
                            <div className={headerStyles.icon}>
                                <BurgerIcon type="secondary"/>
                            </div>
                            <p>Конструктор</p>
                        </NavLink>

                        <NavLink
                            to={'history/order'}
                            activeStyle={{color: '#F2F2F3'}}
                            className={headerStyles.item}>
                            <div className={headerStyles.icon}>
                                <ListIcon type="secondary"/>
                            </div>
                            <p>Лента заказов</p>
                        </NavLink>

                    </div>

                    <div className={headerStyles.logo}>
                        <Logo/>
                    </div>

                    <NavLink to={'profile'}
                             activeStyle={{color: '#F2F2F3'}}
                             className={headerStyles.item}>
                        <div className={headerStyles.icon}>
                            <ProfileIcon type="secondary"/>
                        </div>
                        <p>Личный кабинет</p>
                    </NavLink>

                </nav>
            </header>
        </section>
    )
}

export default AppHeader;


