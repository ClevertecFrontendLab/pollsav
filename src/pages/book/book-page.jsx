import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

import reviewAvatar from '../../images/avatar-review.png';
import { useGetBookByIdQuery } from '../../redux/get-book';
import { Error } from '../../ui/components/error';
import { Loader } from '../../ui/components/loader';
import { Rating } from '../../ui/components/rating';
import { Slider } from '../../ui/components/swiper/swiper';

import { ReactComponent as Arrow } from './Vector.svg';

import s from './bookpage.module.css';

export const BookPage = () => {
  const category = useSelector((state) => state.category.category);
  const { category: link, bookId } = useParams();
  const { data, isLoading, isError } = useGetBookByIdQuery(bookId);
  const [reviewToggle, setToggle] = useState(false);
  const [screenWidth, setWidth] = useState(window.innerWidth);

  const setWidthScreen = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', setWidthScreen);

    return () => {
      window.removeEventListener('resize', setWidthScreen);
    };
  }, [screenWidth]);

  return (
    <section className={s.book_page}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className={s.background}> </div>
          <div className={s.category}>
            <div className={s.category_wrap}>
              <span className={s.type}>
                <Link to={`/books/${link}`} data-test-id='breadcrumbs-link'>
                  {category}
                </Link>
              </span>
              <span className={s.slash}>/</span>
              <span className={s.book} data-test-id='book-name'>
                {data ? data.title : null}
              </span>
            </div>
          </div>
          {isError ? (
            <Error />
          ) : (
            <div>
              <div className={s.title_book}>
                <div className={s.image}>
                  {screenWidth > 769 ? <Slider desctop={true} mobile={false} images={data.images} /> : null}
                </div>
                <div className={s.wrapper}>
                  <div className={s.info}>
                    {screenWidth < 769 ? (
                      <Slider className={s.info_img} mobile={true} desctop={false} images={data.images} />
                    ) : null}
                    <div className={s.info_wrap}>
                      <h2 data-test-id='book-title'>{data.title}</h2>
                      <span>{`${data.authors[0]}, ${data.issueYear}`}</span>
                      <button type='button'>Забронировать</button>
                    </div>
                  </div>
                  <div className={s.descr}>
                    <h4>О книге</h4>
                    <p>{data.description}</p>
                  </div>
                </div>
              </div>
              <div className={s.rating}>
                <h4>Рейтинг</h4>
                <Rating rating={data.rating} />
              </div>
              <div className={s.full_info}>
                <h4>Подробная информация</h4>
                <div className={s.full_wrap}>
                  <div className={s.full_descr}>
                    <div className={s.keys_wrap}>
                      <p className={s.full_key}>Издательство</p>
                      <p className={s.full_key}>Год издания</p>
                      <p className={s.full_key}>Страниц</p>
                      <p className={s.full_key}>Переплет</p>
                      <p className={s.full_key}>Формат</p>
                    </div>
                    <div className={s.value_wrap}>
                      <p className={s.full_value}>{data.publish}</p>
                      <p className={s.full_value}>{data.issueYear}</p>
                      <p className={s.full_value}>{data.pages}</p>
                      <p className={s.full_value}>{data.cover}</p>
                      <p className={s.full_value}>{data.format}</p>
                    </div>
                  </div>
                  <div className={s.full_descr2}>
                    <div className={s.keys_wrap}>
                      <p className={s.full_key}>Жанр</p>
                      <p className={s.full_key}>Вес</p>
                      <p className={s.full_key}>ISBN</p>
                      <p className={s.full_key}>Изготовитель</p>
                    </div>
                    <div className={s.value_wrap}>
                      <p className={s.full_value}>{data.categories[0]}</p>
                      <p className={s.full_value}>{data.weight}</p>
                      <p className={s.full_value}>{data.ISBN}</p>
                      <p className={s.full_value}>{data.producer}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.reviews}>
                <h4>
                  Отзывы <span>{data.comments === null ? null : data.comments.length}</span>
                  <Arrow
                    data-test-id='button-hide-reviews'
                    className={cn(s.arrow, { [s.close_arrow]: reviewToggle === true })}
                    onClick={() => {
                      setToggle(!reviewToggle);
                    }}
                  />
                </h4>
                <div className={cn(s.reviews_wrap, { [s.close_rewiev]: reviewToggle === true })}>
                  {data.comments
                    ? data.comments.map((item) => (
                        <div className={s.review} key={item.id}>
                          <div className={s.review_author}>
                            {item.user.avatarUrl === null ? (
                              <img src={reviewAvatar} alt='' />
                            ) : (
                              <img src={`https://strapi.cleverland.by/uploads${item.user.avatarUrl}`} alt='' />
                            )}
                            <div className={s.author_wrap}>
                              <span className={s.author_name}>{`${item.user.firstName} ${item.user.lastName}`}</span>
                              <span className={s.review_date}>
                                {new Date(item.createdAt).toLocaleString('ru', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                          </div>
                          <Rating rating={item.rating} />
                          <p className={s.review_feedback}>{item.text}</p>
                        </div>
                      ))
                    : null}
                </div>
              </div>
              <button type='button' className={s.second_btn} data-test-id='button-rating'>
                Оценить книгу
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
