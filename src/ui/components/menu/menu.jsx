import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useGetCategoriesQuery } from '../../../redux/get-book';
import { toggleMenuMode } from '../../../redux/slices/menu-slice';
import { Error } from '../error';
import { Loader } from '../loader';

import { ReactComponent as Arrow } from './Vector.svg';

import s from './menu.module.css';

export const Menu = () => {
  const menuMode = useSelector((state) => state.menu.menuMode);
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const dispatch = useDispatch();
  const [menuOpen, toggleMenu] = useState(false);
  const [tab, setTab] = useState('books');
  const [category, setCategory] = useState('all');

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={cn(s.menu, { [s.active_menu]: menuMode === true })} data-test-id='burger-navigation'>
      <ul className={s.link}>
        <li
          className={s.main_link}
          onClick={() => {
            toggleMenu(!menuOpen);
            setTab('books');
          }}
          role='presentation'
        >
          <div
            className={cn(s.link_books, { [s.active_link]: tab === 'books' })}
            data-test-id={window.innerWidth < 769 ? 'burger-showcase' : 'navigation-showcase'}
          >
            Витрина книг
            <Arrow className={cn(s.arrow, { [s.close_arrow]: menuOpen === true })} />
          </div>
          <ul className={cn(s.category_wrap, { [s.close]: menuOpen === true })}>
            <li
              className={cn(s.category_link, { [s.active_category]: category === 'all' })}
              data-test-id={window.innerWidth < 769 ? 'burger-books' : 'navigation-books'}
              onClick={() => {
                dispatch(toggleMenuMode(false));
                toggleMenu(true);
                setCategory('all');
              }}
              role='presentation'
            >
              <Link to={`/books/${'all'}`}>Все книги</Link>
            </li>
            {data.map((item) => (
              <li
                key={item.id}
                className={cn(s.category_link, { [s.active_category]: item.path === category })}
                onClick={() => {
                  dispatch(toggleMenuMode(false));
                  toggleMenu(true);
                  setCategory(item.path);
                }}
                role='presentation'
              >
                <Link to={`/books/${item.path}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li
          className={cn(s.main_link, { [s.active_link]: tab === 'terms' })}
          data-test-id={window.innerWidth < 769 ? 'burger-terms' : 'navigation-terms'}
          onClick={() => {
            toggleMenu(true);
            setTab('terms');
          }}
          role='presentation'
        >
          <Link to='/terms'>Правила пользования</Link>
        </li>
        <li
          className={cn(s.main_link, { [s.active_link]: tab === 'rules' })}
          data-test-id={window.innerWidth < 769 ? 'burger-contract' : 'navigation-contract'}
          onClick={() => {
            toggleMenu(true);
            setTab('rules');
          }}
          role='presentation'
        >
          <Link to='/contract'>Договор оферты</Link>
        </li>
      </ul>
    </div>
  );
};
