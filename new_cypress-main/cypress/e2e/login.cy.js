import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
         cy.visit('/'); // Зайти на сайт

// Видимость и цвет элементов
         cy.get(main_page.title).should('be.visible'); // Проверить что заголовок формы авторизации виден
         cy.get(main_page.email).should('be.visible'); // Проверить что поле email видно
         cy.get(main_page.password).should('be.visible'); // Проверить что поле "пароль" видно
         cy.get(main_page.login_button).should('be.visible'); // Проверить что кнопка "Войти" видна
         cy.get(main_page.fogot_pass_btn).should('be.visible'); // Проверить что ссылка "Забыли пароль?" видна
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверить цвет кнопки "Забыли пароль?"
         cy.get(main_page.footer).should('be.visible'); // Проверить видимость ссылки в футере
        
// Текст элементов
         cy.get(main_page.title).contains('Форма логина'); // Проверить содержание текста в заголовке формы авторизации
         cy.get(main_page.login_button).contains('Войти'); // Проверить содержание текста кнопки "Войти"
         cy.get(main_page.fogot_pass_btn).contains('Забыли пароль?'); // Проверить содержание текста ссылки "Забыли пароль?"
         cy.get(main_page.footer).contains('qa.studio'); // Проверить содержание текста ссылки в футере
        });

    afterEach('Конец теста', function () {
// Видимость и цвет элементов
         cy.get(result_page.close).should('be.visible'); // Проверить что иконка "крестик" видна
         cy.get(main_page.footer).should('be.visible'); // Проверить видимость ссылки в футере

// Текст элементов
         cy.get(main_page.footer).contains('qa.studio'); // Проверить содержание текста ссылки в футере
        });

    it('Верный пароль и верный логин', function () {
// Действия
         cy.get(main_page.email).type(data.login); // Ввести верный логин
         cy.get(main_page.password).type(data.password); // Ввести верный пароль
         cy.get(main_page.login_button).click(); // Нажать кнопку войти

// Проверки
         cy.get(result_page.title).should('be.visible'); // Проверить что текст успешной авторизиции виден
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверить содержание текста успешной авторизации
         
    })

    it('Восстановление пароля', function () {
// Действия
         cy.get(main_page.fogot_pass_btn).click(); // Нажать ссылку "Забыли пароль?"

// Видимость и цвет элементов
         cy.get(recovery_password_page.close).should('be.visible'); // Проверить что иконка "крестик" видна
         cy.get(recovery_password_page.title).should('be.visible'); // Проверить что заголовок формы восстановления пароля виден
         cy.get(recovery_password_page.email).should('be.visible'); // Проверить что поле email видно
         cy.get(recovery_password_page.send_button).should('be.visible'); // Проверить что кнопка "Отправить код" видна
         cy.get(recovery_password_page.footer).should('be.visible'); // Проверить видимость ссылки в футере

// Текст элементов
         cy.get(recovery_password_page.title).contains('Восстановите пароль'); // Проверить содержание текста в заголовке формы восстановлени пароля
         cy.get(recovery_password_page.send_button).contains('Отправить код'); // Проверить содержание текста кнопки "Отправить код"
         cy.get(recovery_password_page.footer).contains('qa.studio'); // Проверить содержание текста ссылки в футере

// Действия
         cy.get(recovery_password_page.email).type(data.login); // Ввести любой email
         cy.get(recovery_password_page.send_button).click(); // Нажать кнопку "Отправить код"

// Проверки
         cy.get(result_page.title).should('be.visible'); // Проверить что текст успешного восстановления виден
         cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверить содержание текста успешного восстановления

    })

    it('Верный логин и неверный пароль', function () {
// Действия
         cy.get(main_page.email).type(data.login); // Ввести верный логин
         cy.get(main_page.password).type('iLoveqastudio2'); // Ввести неверный пароль
         cy.get(main_page.login_button).click(); // Нажать кнопку войти

// Проверки
         cy.get(result_page.title).should('be.visible'); // Проверить что текст ошибки авторизации виден
         cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверить содержание текста ошибки авторизации
        
    })

    it('Неверный логин и верный пароль', function () {
// Действия
         cy.get(main_page.email).type('germanxxx@dolnikov.ru'); // Ввести неверный логин
         cy.get(main_page.password).type(data.password); // Ввести верный пароль
         cy.get(main_page.login_button).click(); // Нажать кнопку войти

// Проверки
         cy.get(result_page.title).should('be.visible'); // Проверить что текст ошибки авторизации виден
         cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверить содержание текста ошибки авторизации
        
    })

    it('Валидация на наличие @', function () {
// Действия
         cy.get(main_page.email).type('germandolnikov.ru'); // Ввести email без символа "@"
         cy.get(main_page.password).type(data.password); // Ввести верный пароль
         cy.get(main_page.login_button).click(); // Нажать кнопку войти

// Проверки
         cy.get(result_page.title).should('be.visible'); // Проверить что текст ошибки валидации виден
         cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверить содержание текста ошибки валидации
    })

    it('Приведение к строчным буквам в логине', function () {
// Действия
         cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввести email с использованием букв верхнего регистра
         cy.get(main_page.password).type(data.password); // Ввести верный пароль
         cy.get(main_page.login_button).click(); // Нажать кнопку войти

// Проверки
         cy.get(result_page.title).should('be.visible'); // Проверить что текст успешной авторизиции виден
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверить содержание текста успешной авторизации
     })

    })
