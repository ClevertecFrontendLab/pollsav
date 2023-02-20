import React, { useState } from 'react';
import cn from 'classnames';
/* eslint-disable import/no-extraneous-dependencies */
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './styles.css';
import s from './swiper.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const host = 'https://strapi.cleverland.by';

export const Slider = ({ mobile, desctop, images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <React.Fragment>
      <Swiper
        data-test-id='slide-big'
        pagination={mobile && { clickable: true }}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className={cn(s.mySwiper2, { [s.mobile_sliderbig]: mobile === true })}
      >
        {images.map((img) => (
          <SwiperSlide key={Math.random()}>
            <img src={`${host}${img.url}`} alt='' />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        data-test-id='slide-mini'
        onSwiper={setThumbsSwiper}
        spaceBetween={50}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={s.mySwiper}
        style={desctop === true && mobile === false ? { display: 'block' } : { display: 'none' }}
      >
        {images.map((img) => (
          <SwiperSlide key={Math.random()}>
            <img src={`${host}${img.url}`} alt='' />
          </SwiperSlide>
        ))}
      </Swiper>
    </React.Fragment>
  );
};
