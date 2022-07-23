

describe('products management works correctly', function() {
    before(function () {
        cy.visit('http://localhost:3000');
    });

    it('при первом запуске проверить загрузку ингредиентов', function () {
        cy.get('[class^=ingredient-card_wrapper__]').first().as('ingredient_card');
        cy.get('@ingredient_card');
    });

    it('открыть и закрыть модалку с любым ингредиентом', function () {
        cy.get('[class^=ingredient-card_wrapper__]').first().as('ingredient_card');
        cy.get('@ingredient_card').find('.text_type_main-default').click();
        cy.get('[class^=order-details_header__').find('svg').click();
    });

    const dataTransfer = new DataTransfer;
    function dndIt() {
        cy.get('[class^=ingredient-card_wrapper__]').first().as('ingredient_card')
            .trigger('dragstart', { dataTransfer });

        cy.get('[class^=burger-constructor_wrapper__]').first().as('constructor')
            .trigger('drop', { dataTransfer });


        cy.get('[class^=ingredient-card_wrapper__]').last().as('sauce')
            .trigger('dragstart', { dataTransfer });

        cy.get('@constructor').trigger('drop', { dataTransfer });
    }


    it('Check whether the drag and drop of an item is working fine', function() {
        dndIt();
        cy.get('@constructor').find('.constructor-element')
        cy.get('[class^=burger-constructor_result__]').first().as('bottom');
        cy.get('@bottom').find('button').click();


        cy.get('.input_type_email').find('.input__icon').click()
        cy.get("input[type='email']").as('emailInput').type('epol1394@gmail.com');

        cy.get("input[type='password']").type('burger2');
        cy.get('[class^=button]').click();

        cy.get('[class^=burger-constructor_result__]').first().as('bottom');
        cy.get('@bottom').find('button').click().wait(20000);

        cy.get('[class^=order-details_identification]')

        cy.get('[class^=order-details_header]').find('svg').click();

    });
})


