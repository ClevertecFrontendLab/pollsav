import { Outlet } from 'react-router-dom';

import { Menu } from '../../components/menu';

import s from './layoutmainpage.module.css';

export const LayoutMainPage = () => (
  <main className={s.content}>
    <Menu />
    <Outlet />
  </main>
);
