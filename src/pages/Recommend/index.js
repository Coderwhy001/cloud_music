import React, { useEffect, useState } from 'react';
import './style.less';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getBannerRequest, getRecommendListRequest } from '../../api/request'
import { renderRoutes } from "react-router-config";
import RecommendList from '../../components/list'
import 'swiper/swiper.less';
import 'swiper/components/navigation/navigation.less';
import 'swiper/components/pagination/pagination.less';
import 'swiper/components/scrollbar/scrollbar.less';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
function Recommend(props) {
  const isNotAlbumPage = isNaN(Number(props.location.pathname.slice(-1))) ? true : false;
  const [bannerList, setBannerList] = useState([])
  const [recommendList, setRecommendList] = useState([])
  useEffect(() => {
    getBannerRequest().then(res => {
      setBannerList(res ? res.banners : [])
    })
    getRecommendListRequest().then(res => {
      setRecommendList(res ? res.result : [])
    })
  }, [])
  return (
    <div className="Recommend">
      {
        isNotAlbumPage ? 
        <div className="Recommend__content">
          <div className="item_wrapper">
            <Swiper
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            autoplay
          >
              {
                bannerList.map((item, index) => {
                  return (
                    <SwiperSlide key={item.imageUrl}>
                      <img src={item.imageUrl} width="100%" height="100%" alt="推荐" />
                    </SwiperSlide>
                  )
                })
              }
              ...
            </Swiper>
            <div className="Recommend__content__song">
              <h1 className="title">推荐歌单</h1>
              <RecommendList recommendList={recommendList} />
            </div>
          </div>
        </div>
      : null
      }
      { renderRoutes(props.route.routes) }
    </div>
  )
}

export default React.memo(Recommend);