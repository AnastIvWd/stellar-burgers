import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeedsThunk = createAsyncThunk(
  'burgerConstructorSlice/getFeedsApi',
  async () => await getFeedsApi()
);

export const gerOrdersThunk = createAsyncThunk(
  'burgerConstructorSlice/getOrdersApi',
  async () => await getOrdersApi()
);
