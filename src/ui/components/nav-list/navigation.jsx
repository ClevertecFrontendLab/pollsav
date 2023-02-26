import { Buttons } from './buttons';
import { Filter } from './filter';
import { Search } from './search';

import s from './navigation.module.css';

export const Navigation = ({ switchDirection, direction }) => (
  <div className={s.nav_wrapper}>
    <Search />
    <Filter />
    <Buttons switchDirection={switchDirection} direction={direction} />
  </div>
);
