import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useGetAllBooksQuery } from '../../redux/get-book';
import { Card } from '../../ui/components/card';
import { Error } from '../../ui/components/error';
import { Loader } from '../../ui/components/loader';
import { Navigation } from '../../ui/components/nav-list';

import s from './main-page.module.css';

export const MainPage = () => {
  const category = useSelector((state) => state.category.category);
  const sorted = useSelector((state) => state.filter.filterByAscending);
  const nameOfBook = useSelector((state) => state.filter.nameBook);
  const [direction, setDirection] = useState('row');
  const { data, isLoading, isError, refetch } = useGetAllBooksQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const switchDirection = (value) => {
    setDirection(value);
  };

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const sortedBooks = data.slice().sort((a, b) => (sorted ? b.rating - a.rating : a.rating - b.rating));

  const filteredCategories =
    category === 'Все книги' ? sortedBooks : sortedBooks.filter((item) => item.categories.includes(category));

  const filterByTitleBook = filteredCategories.filter((book) =>
    book.title.toLowerCase().includes(nameOfBook.toLowerCase())
  );

  return (
    <section className={s.MainPage}>
      <div className={s.content_wrapper}>
        <Navigation switchDirection={switchDirection} direction={direction} />
        <div
          className={cn(
            s.books_wrap,
            { [s.column]: direction === 'column' },
            { [s.center]: filteredCategories.length === 0 || filterByTitleBook.length === 0 }
          )}
        >
          {filteredCategories.length === 0 ? (
            <h3 className={s.warning} data-test-id='empty-category'>
              В этой категории книг ещё нет
            </h3>
          ) : filterByTitleBook.length === 0 ? (
            <h3 className={s.warning} data-test-id='search-result-not-found'>
              По запросу ничего не найдено
            </h3>
          ) : (
            filterByTitleBook.map((book) => (
              <Link to={`${book.id}`} key={book.id}>
                <Card direction={direction} detailsBook={book} nameOfBook={nameOfBook} />
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
