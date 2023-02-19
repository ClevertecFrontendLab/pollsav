import { Outlet } from 'react-router-dom';

import { Footer } from './footer/footer';
import { Header } from './header/header';

import s from './layout.module.css';

export const Layout = () => (
  <div className={s.container}>
    <Header />
    <Outlet />
    <Footer />
  </div>
);
