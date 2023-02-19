import { useState } from 'react';
import cn from 'classnames';

import { ReactComponent as Star } from './Icon_star.svg';

import s from './rating.module.css';

const arr = [1, 2, 3, 4, 5];

export const Rating = ({ rating }) => {
  const [ratingCount, setRating] = useState(rating);
  const [hover, setHover] = useState(0);

  return (
    <div className={s.rating_wrap}>
      {arr.map((item, index) => (
        <Star
          key={`${item}+1`}
          className={cn(s.star, {
            [s.on]: item <= (hover || ratingCount),
            [s.off]: item > (hover || ratingCount),
          })}
          onClick={() => setRating(item)}
          onMouseEnter={() => setHover(item)}
          onMouseLeave={() => setHover(ratingCount)}
        />
      ))}
    </div>
  );
};
