import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css'


const AppHeader = () => {
    const itemMargin = {
        marginRight: '28px',
    };
    return (
        <section>
            <header className={headerStyles.header}>
                <nav className={headerStyles.nav}>
                    <div className={headerStyles.two}>
                    <div className={headerStyles.item} style={itemMargin}>
                        <div className={headerStyles.icon}>
                            <BurgerIcon type="primary"/>
                        </div>
                        <div className="text text_type_main-default">Конструктор</div>
                    </div>
                    <div className={headerStyles.item}>
                        <div className={headerStyles.icon}>
                            <ListIcon type="secondary"/>
                        </div>
                        <div className="text text_type_main-default text_color_inactive">Лента заказов</div>
                    </div>
                    </div>
                    <div className={headerStyles.logo}>
                        <Logo/>
                    </div>
                    <div className={headerStyles.item}>
                        <div className={headerStyles.icon}>
                            <ProfileIcon type="secondary"/>
                        </div>
                        <div className="text text_type_main-default text_color_inactive">Личный кабинет</div>
                    </div>
                </nav>
            </header>
        </section>
    )
}

export default AppHeader;


