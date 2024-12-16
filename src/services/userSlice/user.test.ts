import userReducer, { IUserSlice } from './slice';
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  logoutThunk,
  checkUserAuthThunk
} from './thunk';

describe('Тестирование пользователя', () => {
  const initialState: IUserSlice = {
    user: null,
    isAuthChecked: false,
    isLoading: false
  };

  const user = {
    email: 'a',
    name: 'a'
  };

  const loginData = {
    email: 'a',
    password: 'a'
  };

  const registerData = {
    email: 'a',
    name: 'a',
    password: 'a'
  };

  const userResponse = {
    success: true,
    user: user
  };

  it('Проверка статуса загрузки авторизации', () => {
    const actualState = userReducer(
      initialState,
      loginUserThunk.pending('', loginData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('Проверка успешного выполнения запроса - авторизация', () => {
    const actualState = userReducer(
      initialState,
      loginUserThunk.fulfilled(user, '', loginData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      user
    });
  });

  it('Проверка ошибки при выполнении запроса - авторизация', () => {
    const actualState = userReducer(
      initialState,
      loginUserThunk.rejected(null, '', loginData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      user: null
    });
  });

  it('Проверка статуса загрузки регистрации', () => {
    const actualState = userReducer(
      initialState,
      registerUserThunk.pending('', registerData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('Проверка успешного выполнения запроса - регистрация', () => {
    const actualState = userReducer(
      initialState,
      registerUserThunk.fulfilled(user, '', registerData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      user
    });
  });

  it('Проверка ошибки при выполнении запроса - регистрация', () => {
    const actualState = userReducer(
      initialState,
      registerUserThunk.rejected(null, '', registerData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      user: null
    });
  });

  it('Проверка статуса загрузки обновления профиля', () => {
    const actualState = userReducer(
      initialState,
      updateUserThunk.pending('', registerData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('Проверка успешного выполнения запроса - обновление профиля', () => {
    const actualState = userReducer(
      initialState,
      updateUserThunk.fulfilled(userResponse, '', registerData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      user
    });
  });

  it('Проверка ошибки при выполнении запроса - обновление профиля', () => {
    const actualState = userReducer(
      initialState,
      updateUserThunk.rejected(null, '', registerData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false
    });
  });

  it('Проверка статуса загрузки выхода из профиля', () => {
    const actualState = userReducer(initialState, logoutThunk.pending(''));
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('Проверка успешного выполнения запроса - выход из профиля', () => {
    const actualState = userReducer(
      initialState,
      logoutThunk.fulfilled(userResponse, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      user: null
    });
  });

  it('Проверка ошибки при выполнении запроса - выход из профиля', () => {
    const actualState = userReducer(
      initialState,
      logoutThunk.rejected(null, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false
    });
  });

  it('Проверка статуса загрузки проверки профиля', () => {
    const actualState = userReducer(
      initialState,
      checkUserAuthThunk.pending('')
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('Проверка успешного выполнения запроса - проверка профиля', () => {
    const actualState = userReducer(
      initialState,
      checkUserAuthThunk.fulfilled(user, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      user
    });
  });

  it('Проверка ошибки при выполнении запроса - проверка профиля', () => {
    const actualState = userReducer(
      initialState,
      checkUserAuthThunk.rejected(null, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      user: null
    });
  });
});
