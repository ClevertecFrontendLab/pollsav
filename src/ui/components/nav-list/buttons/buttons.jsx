import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';

import { ReactComponent as ColumnButton } from './columnButton.svg';
import { ReactComponent as Rowbutton } from './rowbutton.svg';

import s from './buttons.module.css';

export const Buttons = ({ switchDirection, direction }) => (
  <div className={s.button_wrapper}>
    <button
      type='button'
      className={cn(s.row_btn, { [s.active]: direction === 'row' })}
      onClick={() => switchDirection('row')}
      data-test-id='button-menu-view-window'
    >
      <Rowbutton />
    </button>
    <button
      type='button'
      className={cn(s.column_btn, { [s.active]: direction === 'column' })}
      onClick={() => switchDirection('column')}
      data-test-id='button-menu-view-list'
    >
      <ColumnButton />
    </button>
  </div>
);
