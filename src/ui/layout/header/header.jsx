import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { toggleMenuMode } from '../../../redux/slices/menu-slice';

import avatar from './avatar.png';
import { ReactComponent as Logo } from './logo.svg';

import s from './header.module.css';

export const Header = () => {
  const menuMode = useSelector((state) => state.menu.menuMode);
  const dispatch = useDispatch();

  return (
    <div>
      <header className={s.header}>
        <button
          data-test-id='button-burger'
          type='button'
          className={cn(s.menu_icon, { [s.active]: menuMode === true })}
          onClick={() => {
            dispatch(toggleMenuMode());
          }}
        >
          <span className={s.bar} />
          <span className={s.bar} />
          <span className={s.bar} />
        </button>
        <Link to='/'>
          <div className={s.header_icon}>
            <Logo />
          </div>
        </Link>
        <h3 className={s.title}>Библиотека</h3>
        <div className={s.header_account}>
          <span>Привет!</span>
          <img src={avatar} alt='' className={s.header_account_icon} />
        </div>
      </header>
    </div>
  );
};
