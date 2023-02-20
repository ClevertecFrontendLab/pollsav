import iconFacebook from '../../../images/icon/Facebook.svg';
import iconInstagram from '../../../images/icon/Instagram.svg';
import iconLinkedIn from '../../../images/icon/Llinkedin.svg';
import iconVk from '../../../images/icon/Vk.svg';

import s from './footer.module.css';

export const Footer = () => (
  <div className={s.footer}>
    <span>© 2020-2023 Cleverland. Все права защищены.</span>
    <div className={s.social_icon}>
      <div>
        <a href='https://ru-ru.facebook.com/'>
          <img src={iconFacebook} alt='' />
        </a>
      </div>
      <div>
        <a href='https://www.instagram.com/'>
          <img src={iconInstagram} alt='' />
        </a>
      </div>
      <div>
        <a href='https://vk.com/'>
          <img src={iconVk} alt='' />
        </a>
      </div>
      <div>
        <a href='https://ru.linkedin.com/'>
          <img src={iconLinkedIn} alt='' />
        </a>
      </div>
    </div>
  </div>
);
