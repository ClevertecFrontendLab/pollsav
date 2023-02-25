import { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { toggleFilter } from '../../../../redux/slices/filter-slice';

import filterIcon from './filterIcon.svg';

import s from './filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const [rotate, setRotate] = useState(true);

  return (
    <div
      className={s.filter}
      onClick={() => {
        dispatch(toggleFilter());
        setRotate(!rotate);
      }}
      role='presentation'
      data-test-id='sort-rating-button'
    >
      <a className={s.filter_btn}>По рейтингу</a>
      <img src={filterIcon} alt='filter' className={cn(s.filter_icon, { [s.rotate]: rotate === false })} />
    </div>
  );
};
