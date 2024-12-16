/// <reference types='cypress' />

const SELECTORS = {
  BUN_INGREDIENT: '[data-cy="bun-ingredient"]',
  MAINS_INGREDIENT: '[data-cy="mains-ingredient"]',
  CONSTRUCTOR_INGREDIENTS: '[data-cy="constructor-indredients"]',
  BUTTON_CLOSE: '#modals button[aria-label="Закрыть"]',
  ORDER_SUM: '[data-cy="order-sum"]',
  ORDER_NUMBER: '[data-cy="order-number"]'
}

describe('Добавление ингредиента в конструктор', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json'});
    cy.viewport(1300, 800);
    cy.visit('');
  });

  it('Добавление булки в конструктор', () => {
    cy.get(SELECTORS.BUN_INGREDIENT).contains('Добавить').click();
    cy.get('[data-cy="constructor-bun-1"]')
      .contains('Булочка с кунжутом')
      .should('exist')
  });

  it('Добавление ингредиента в конструктор', () => {
    cy.get(SELECTORS.MAINS_INGREDIENT).contains('Добавить').click();
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS)
      .contains('Говяжья котлета')
      .should('exist')
  });
})

describe('Корректная работа модальных окон', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json'});
    cy.viewport(1300, 800);
    cy.visit('');
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
    cy.get(SELECTORS.BUTTON_CLOSE).click();
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
    cy.visit('');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Оформление заказа', () => {
    cy.get(SELECTORS.BUN_INGREDIENT).contains('Добавить').click();
    cy.get(SELECTORS.MAINS_INGREDIENT).contains('Добавить').click();
    cy.get('[data-cy="sauces-ingredient"]').contains('Добавить').click();
    cy.get(SELECTORS.ORDER_SUM).click()
    cy.get(SELECTORS.ORDER_SUM).click()
    
    cy.wait('@postOrder')
    .its('request.body')
    .should('deep.equal', {
      ingredients: ['1', '5', '2', '2']
    });
    
    cy.get(SELECTORS.ORDER_NUMBER).contains('123');

    cy.get(SELECTORS.BUTTON_CLOSE).click();
    cy.contains(SELECTORS.ORDER_NUMBER).should('not.exist');

    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS)
      .contains('Булочка с кунжутом')
      .should('not.exist');
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS)
      .contains('Говяжья котлета')
      .should('not.exist');
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS)
      .contains('Соус барбекю')
      .should('not.exist')
  });
})
