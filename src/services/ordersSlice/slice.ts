import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsThunk, gerOrdersThunk } from './thunk';

export interface IOrdersSlice {
  feeds: {
    isLoading: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  orders: {
    isLoading: boolean;
    items: TOrder[];
  };
}

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

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.feeds.isLoading = true;
      })
      .addCase(getFeedsThunk.fulfilled, (state, { payload }) => {
        state.feeds.isLoading = false;
        state.feeds.orders = payload.orders;
        state.feeds.total = payload.total;
        state.feeds.totalToday = payload.totalToday;
      })
      .addCase(getFeedsThunk.rejected, (state) => {
        state.feeds.isLoading = false;
        state.feeds.orders = [];
        state.feeds.total = 0;
        state.feeds.totalToday = 0;
      })
      .addCase(gerOrdersThunk.pending, (state) => {
        state.orders.isLoading = true;
      })
      .addCase(gerOrdersThunk.fulfilled, (state, { payload }) => {
        state.orders.isLoading = false;
        state.orders.items = payload;
      })
      .addCase(gerOrdersThunk.rejected, (state) => {
        state.orders.isLoading = false;
        state.orders.items = [];
      });
  }
});

export default ordersSlice.reducer;
