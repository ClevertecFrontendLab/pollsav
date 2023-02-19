import s from './loader.module.css';

export const Loader = () => (
  <div className={s.spinner_container} data-test-id='loader'>
    <div className={s.spinner}> </div>
  </div>
);
