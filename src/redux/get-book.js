import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://strapi.cleverland.by/api' }),
  endpoints: (builder) => ({
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
    }),
    getCategories: builder.query({
      query: () => '/categories',
    }),
    getAllBooks: builder.query({
      query: () => '/books',
    }),
  }),
});

export const { useGetBookByIdQuery, useGetCategoriesQuery, useGetAllBooksQuery } = booksApi;
