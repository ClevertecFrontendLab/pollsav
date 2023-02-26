import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useGetAllBooksQuery, useGetCategoriesQuery } from '../../../redux/get-book';
import { setCategories } from '../../../redux/slices/category-slice';
import { toggleMenuMode } from '../../../redux/slices/menu-slice';
import { Error } from '../error';
import { Loader } from '../loader';

import { ReactComponent as Arrow } from './Vector.svg';

import s from './menu.module.css';

export const Menu = () => {
  const menuMode = useSelector((state) => state.menu.menuMode);
  const category = useSelector((state) => state.category.category);
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const { data: books, isSuccess } = useGetAllBooksQuery();
  const [menuOpen, toggleMenu] = useState(true);
  const [tab, setTab] = useState('books');

  let countByCategory = null;

  if (isSuccess) {
    countByCategory = books.reduce((acc, book) => {
      const result = { ...acc };
      const bookCategories = book.categories;

      bookCategories.forEach((type) => {
        result[type] = result[type] ? result[type] + 1 : 1;
      });

      return result;
    }, {});
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={cn(s.menu, { [s.active_menu]: menuMode === true })} data-test-id='burger-navigation'>
      <ul className={s.link}>
        <li className={s.main_link}>
          <div
            className={cn(s.link_books, { [s.active_link]: tab === 'books' })}
            data-test-id={window.innerWidth < 769 ? 'burger-showcase' : 'navigation-showcase'}
            onClick={() => {
              toggleMenu(!menuOpen);
              setTab('books');
            }}
            role='presentation'
          >
            Витрина книг
            <Arrow className={cn(s.arrow, { [s.close_arrow]: menuOpen === false })} />
          </div>
          <ul className={cn(s.category_wrap, { [s.close]: menuOpen === false })}>
            {isError ? (
              <Error />
            ) : (
              <div>
                <li
                  className={cn(s.category_link, { [s.active_category]: category === 'Все книги' })}
                  data-test-id={window.innerWidth < 769 ? 'burger-books' : 'navigation-books'}
                  onClick={() => {
                    dispatch(toggleMenuMode());
                    dispatch(setCategories('Все книги'));
                    setCategories('all');
                  }}
                  role='presentation'
                >
                  <Link to={`/books/${'all'}`}>Все книги</Link>
                </li>
                {data.map((item) => (
                  <li
                    key={item.id}
                    className={cn(s.category_link, { [s.active_category]: item.name === category })}
                    onClick={() => {
                      dispatch(toggleMenuMode());
                      dispatch(setCategories(item.name));
                      setCategories(item.path);
                    }}
                    role='presentation'
                  >
                    <Link
                      to={`/books/${item.path}`}
                      data-test-id={window.innerWidth < 769 ? `burger-${item.path}` : `navigation-${item.path}`}
                    >
                      {item.name}
                    </Link>
                    <span
                      className={s.count_books}
                      data-test-id={
                        window.innerWidth < 769
                          ? `burger-book-count-for-${item.path}`
                          : `navigation-book-count-for-${item.path}`
                      }
                    >
                      {isSuccess ? (item.name === 'Другое' ? 0 : countByCategory[item.name]) : null}
                    </span>
                  </li>
                ))}
              </div>
            )}
          </ul>
        </li>
        <li
          className={cn(s.main_link, { [s.active_link]: tab === 'terms' })}
          data-test-id={window.innerWidth < 769 ? 'burger-terms' : 'navigation-terms'}
          onClick={() => {
            dispatch(toggleMenuMode());
            toggleMenu(!menuOpen);
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
            dispatch(toggleMenuMode());
            toggleMenu(!menuOpen);
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
