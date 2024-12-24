import { rootReducer } from './store';

describe('Тест rootReducer', () => {
  it('Тест работы rootReducer', () => {
    const actualStore = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(actualStore).toEqual({
      ingredients: {
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
      },
      user: {
        user: null,
        isAuthChecked: false,
        isLoading: false
      },
      orders: {
        feeds: {
          orders: [],
          total: 0,
          totalToday: 0,
          isLoading: false
        },
        orders: {
          isLoading: false,
          items: []
        }
      }
    });
  });
});
