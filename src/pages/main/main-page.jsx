import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useGetAllBooksQuery } from '../../redux/get-book';
import { Card } from '../../ui/components/card';
import { Error } from '../../ui/components/error';
import { Loader } from '../../ui/components/loader';
import { Navigation } from '../../ui/components/nav-list';

import s from './main-page.module.css';

export const MainPage = () => {
  const [direction, setDirection] = useState('row');
  const { data, isLoading, isError } = useGetAllBooksQuery();

  const switchDirection = (value) => {
    setDirection(value);
  };

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={s.MainPage}>
      <div className={s.content_wrapper}>
        <Navigation switchDirection={switchDirection} direction={direction} />
        <div className={cn(s.books_wrap, { [s.column]: direction === 'column' })}>
          {data.map((book) => (
            <Link to={`${book.id}`} key={book.id}>
              <Card direction={direction} detailsBook={book} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
