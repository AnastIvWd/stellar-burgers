import ordersReducer, { IOrdersSlice } from './slice';
import { getFeedsThunk, gerOrdersThunk } from './thunk';

describe('Тестирование вкладок заказов', () => {
  const initialState: IOrdersSlice = {
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
  };

  it('Проверка статуса загрузки всех заказов', () => {
    const actualState = ordersReducer(initialState, getFeedsThunk.pending(''));
    expect(actualState).toEqual({
      ...initialState,
      feeds: {
        ...initialState.feeds,
        isLoading: true
      }
    });
  });

  it('Проверка успешного выполнения запроса - все заказы', () => {
    const orders = {
      orders: [
        {
          _id: '1-1',
          status: 'Готов',
          name: 'Говяжий бургер',
          createdAt: '12:00',
          updatedAt: '12:00',
          number: 123,
          ingredients: ['2', '1', '5', '2']
        }
      ],
      total: 1,
      totalToday: 1,
      success: true
    };

    const actualState = ordersReducer(
      initialState,
      getFeedsThunk.fulfilled(orders, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      feeds: {
        ...initialState.feeds,
        isLoading: false,
        orders: orders.orders,
        total: orders.total,
        totalToday: orders.totalToday
      }
    });
  });

  it('Проверка ошибки при выполнении запроса - все заказы', () => {
    const actualState = ordersReducer(
      initialState,
      getFeedsThunk.rejected(null, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      feeds: {
        ...initialState.feeds,
        isLoading: false,
        orders: [],
        total: 0,
        totalToday: 0
      }
    });
  });

  it('Проверка статуса загрузки заказов пользователя', () => {
    const actualState = ordersReducer(initialState, gerOrdersThunk.pending(''));
    expect(actualState).toEqual({
      ...initialState,
      orders: {
        ...initialState.orders,
        isLoading: true
      }
    });
  });

  it('Проверка успешного выполнения запроса - заказы пользователя', () => {
    const ordersProfile = [
      {
        _id: '1-1',
        status: 'Готов',
        name: 'Говяжий бургер',
        createdAt: '12:00',
        updatedAt: '12:00',
        number: 123,
        ingredients: ['2', '1', '5', '2']
      }
    ];
    const actualState = ordersReducer(
      initialState,
      gerOrdersThunk.fulfilled(ordersProfile, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      orders: {
        ...initialState.orders,
        isLoading: false,
        items: ordersProfile
      }
    });
  });

  it('Проверка ошибки при выполнении запроса - заказы пользователя', () => {
    const actualState = ordersReducer(
      initialState,
      gerOrdersThunk.rejected(null, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      orders: {
        ...initialState.orders,
        isLoading: false,
        items: []
      }
    });
  });
});
