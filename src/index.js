import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { store } from './redux/store';
import { Contract } from './ui/components/contract';
import { Layout } from './ui/layout';
import { LayoutMainPage } from './ui/layout/layoutmainpage';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route element={<LayoutMainPage />}>
              <Route path='/' element={<Navigate to='/books/all' />} />
              <Route path='/books/:category' element={<MainPage />} />
              <Route path='terms' element={<Contract contentView='terms' />} />
              <Route path='contract' element={<Contract />} contentView='contract' />
            </Route>
            <Route path='books/:category/:bookId' element={<BookPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
