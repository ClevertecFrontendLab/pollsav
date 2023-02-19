// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { menuMode } from './slices/menu-slice';
import { booksApi } from './get-book';

export const store = configureStore({
  reducer: { menu: menuMode, [booksApi.reducerPath]: booksApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksApi.middleware),
});
setupListeners(store.dispatch);
