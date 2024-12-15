/// <reference types='cypress' />

describe('Добавление ингредиента в конструктор', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json'});
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Добавление булки в конструктор', () => {
    cy.get('[data-cy="bun-ingredient"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-bun-1"]')
      .contains('Булочка с кунжутом')
      .should('exist')
  });

  it('Добавление ингредиента в конструктор', () => {
    cy.get('[data-cy="mains-ingredient"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-indredients"]')
      .contains('Говяжья котлета')
      .should('exist')
  });
})

describe('Корректная работа модальных окон', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json'});
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Открытие модального окна', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Говяжья котлета').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Говяжья котлета').should('exist');
  });

  it('Закрытие модального окна по кнопке', () => {
    cy.contains('Говяжья котлета').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрытие модального окна при нажатии на оверлей', () => {
    cy.contains('Говяжья котлета').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy="modal-overlay"]').click('left', {force: true});
    cy.contains('Детали ингредиента').should('not.exist');
  });
})


describe('Создание заказа', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json'}).as('ingredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json'});
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json'}).as('postOrder');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test')
    );
    cy.setCookie('accessToken', 'test1')
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Оформление заказа', () => {
    cy.get('[data-cy="bun-ingredient"]').contains('Добавить').click();
    cy.get('[data-cy="mains-ingredient"]').contains('Добавить').click();
    cy.get('[data-cy="sauces-ingredient"]').contains('Добавить').click();
    cy.get('[data-cy="order-sum"]').click()
    cy.get('[data-cy="order-sum"]').click()
    
    cy.wait('@postOrder')
    .its('request.body')
    .should('deep.equal', {
      ingredients: ['1', '5', '2', '2']
    });
    
    cy.get('[data-cy="order-number"]').contains('123');

    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.contains('[data-cy="order-number"').should('not.exist');

    cy.get('[data-cy="constructor-indredients"]')
      .contains('Булочка с кунжутом')
      .should('not.exist');
    cy.get('[data-cy="constructor-indredients"]')
      .contains('Говяжья котлета')
      .should('not.exist');
    cy.get('[data-cy="constructor-indredients"]')
      .contains('Соус барбекю')
      .should('not.exist')
  });
})
