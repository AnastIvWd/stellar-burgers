import ingredientsReducer, { IngredientsState } from './slice';
import { fetchIngredients, orderBurgerApiThunk } from './thunk';

describe('тестирование конструктора ингредиентов и заказов', () => {
  const initialState: IngredientsState = {
    isIngredientsLoading: false,
    ingredients: [],
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: {
      isRequesting: false,
      order: [],
      orderModalData: null
    }
  };

  it('Проверка успешного выполнения запроса - ингредиенты', () => {
    const ingredients = [
      {
        _id: '1',
        name: 'Говяжья котлета',
        type: 'main',
        proteins: 24,
        fat: 17,
        carbohydrates: 0,
        calories: 250,
        price: 300,
        image: 'test1',
        image_large: 'test1',
        image_mobile: 'test1'
      }
    ];

    const actualState = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(ingredients, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      ingredients,
      isIngredientsLoading: false
    });
  });

  it('Проверка статуса загрузки ингредиентов', () => {
    const actualState = ingredientsReducer(
      initialState,
      fetchIngredients.pending('')
    );
    expect(actualState).toEqual({
      ...initialState,
      isIngredientsLoading: true
    });
  });

  it('Проверка ошибки при выполнении запроса - ингрендиенты', () => {
    const actualState = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(null, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      isIngredientsLoading: false,
      ingredients: []
    });
  });

  it('Проверка успешного выполнения запроса - заказ', () => {
    const order = {
      success: true,
      name: 'Говяжий бургер',
      order: {
        _id: '1-1',
        status: 'Готов',
        name: 'Говяжий бургер',
        createdAt: '12:00',
        updatedAt: '12:00',
        number: 123,
        ingredients: ['2', '1', '5', '2']
      }
    };

    const actualState = ingredientsReducer(
      initialState,
      orderBurgerApiThunk.fulfilled(order, '', ['2', '1', '5', '2'])
    );
    expect(actualState).toEqual({
      ...initialState,
      orderRequest: {
        isRequesting: false,
        order: [],
        orderModalData: order.order
      }
    });
  });

  it('Проверка статуса загрузки заказа', () => {
    const actualState = ingredientsReducer(
      initialState,
      orderBurgerApiThunk.pending('', ['2', '1', '5', '2'])
    );
    expect(actualState).toEqual({
      ...initialState,
      orderRequest: {
        ...initialState.orderRequest,
        isRequesting: true
      }
    });
  });

  it('Проверка ошибки при выполнении запроса - заказ', () => {
    const actualState = ingredientsReducer(
      initialState,
      orderBurgerApiThunk.rejected(null, '', ['2', '1', '5', '2'])
    );
    expect(actualState).toEqual({
      ...initialState,
      orderRequest: {
        ...initialState.orderRequest,
        isRequesting: false,
        order: []
      }
    });
  });
});
