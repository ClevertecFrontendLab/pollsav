import React from 'react';

import filterIcon from './filterIcon.svg';

import s from './filter.module.css';

export const Filter = () => (
  <div className={s.filter}>
    <a className={s.filter_btn}>По рейтингу</a>
    <img src={filterIcon} alt='filter' className={s.filter_icon} />
  </div>
);
