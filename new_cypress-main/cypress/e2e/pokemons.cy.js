describe('Проверка покупки нового аватара', function () {
    it('e2e тест на покупку нового аватара для тренера', function () {
         cy.visit('https://pokemonbattle.ru/'); // Зайти на сайт
         cy.get('input[id="k_email"]').type('USER_LOGIN'); // Ввести логин
         cy.get('input[id="k_password"]').type('USER_PASSWORD'); // Ввести пароль
         cy.get('button[type="submit"]').click(); // Нажать кнопку войти
         cy.wait(2000); // Ожидание 2сек.
         cy.get('.header_card_trainer').click(); // Перейти на страницу тренера
         cy.wait(2000); // Ожидание 2сек.
         cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click(); // Нажать кнопку смены аватара
         cy.get('.available > button').first().click(); // Выбрать доступный для покупки аватар
         cy.get('.card_number').type('4111111111111111'); // Ввести номер карты
         cy.wait(2000); // Ожидание 2сек.
         cy.get('.card_csv').type('125'); // Ввести CVV карты
         cy.get('.card_date').type('0330'); // Ввести срок действия карты
         cy.get('.card_name').type('QAtester'); // Ввести имя владельца
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // Нажать кнопку оплатить
         cy.get('.threeds_number').type('56456'); // Ввести код подтверждения СМС
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // Нажать кнопку оплатить
         cy.contains('Покупка прошла успешно').should('be.visible'); // Проверить наличие и видимость сообщения об успешной покупке
     });
 });
