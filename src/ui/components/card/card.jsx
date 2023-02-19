// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';

import notlogo from '../../../images/notimage.png';
import { Rating } from '../rating';

import s from './card.module.css';

const host = 'https://strapi.cleverland.by';

export const Card = ({ direction, detailsBook }) => {
  if (direction === 'row') {
    return (
      <div className={s.card_wrap} data-test-id='card'>
        <div className={s.card_image}>
          {detailsBook.image === null ? (
            <img src={notlogo} alt='' />
          ) : (
            <img src={`${host}${detailsBook.image.url}`} alt='' />
          )}
        </div>
        <div className={s.card_raiting}>
          {detailsBook?.rating ? <Rating rating={detailsBook.rating} /> : 'еще нет оценок'}
        </div>
        <div className={s.card_title}>
          <p className={s.card_name}>{`${detailsBook.title}`}</p>
          <p className={s.card_author}>{`${detailsBook.authors[0]}, ${detailsBook.issueYear}`}</p>
        </div>
        <div className={cn(s.card_btn, { [s.booked]: detailsBook?.booking?.order === true })}>
          {detailsBook?.booking?.order === true ? 'забронирована' : 'забронировать'}
        </div>
      </div>
    );
  }

  return (
    <div className={s.card_wrap_cl} data-test-id='card'>
      <div className={s.card_image_cl}>
        {detailsBook.image === null ? (
          <img src={notlogo} alt='' />
        ) : (
          <img src={`${host}${detailsBook.image.url}`} alt='' />
        )}
      </div>
      <div className={s.main_wrap}>
        <div className={s.card_title_cl}>
          <p className={s.card_name_cl}>{`${detailsBook.title}`}</p>
          <p className={s.card_author_cl}>{`${detailsBook.authors[0]}, ${detailsBook.issueYear}`}</p>
        </div>
        <div className={s.second_wrap}>
          <div className={s.card_raiting_cl}>
            {detailsBook?.rating ? <Rating rating={detailsBook.rating} /> : 'еще нет оценок'}
          </div>
          <div className={cn(s.card_btn_cl, { [s.booked]: detailsBook?.booking?.order === true })}>
            {detailsBook?.booking?.order === true ? 'забронирована' : 'забронировать'}
          </div>
        </div>
      </div>
    </div>
  );
};
