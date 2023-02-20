import error_logo from './error-icon.png';

import s from './error.module.css';

export const Error = () => (
  <div className={s.error} data-test-id='error'>
    <img src={error_logo} alt='' /> Что-то пошло не так. Обновите страницу через некоторое время
    <button type='button' className={s.button}>
      X
    </button>
  </div>
);
