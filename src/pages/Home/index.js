import React from 'react';
import './style.less';
import { renderRoutes } from "react-router-config";
import IconFont from '../../assets/IconFont'
import { Input } from 'antd';
import { NavLink } from 'react-router-dom';
function Home(props) {
  const { route, location } = props;
  const isNotDetailPage = isNaN(Number(location.pathname.slice(-1))) ? true : false;
  return (
    <div className="home">
      <div className="home__top">
        <IconFont type="iconwangyiyun" style={{ fontSize: '26px', marginLeft: '18px', marginRight: '4px' }} />
        <span className="home__top__title">网易云音乐</span>
        <Input addonBefore={<IconFont type="iconsearch" />} placeholder='搜索'/>
      </div>
      {
        isNotDetailPage ? 
          <div className="home__bottom">
          <NavLink to="/recommend" activeClassName="selected"><span>个性推荐</span></NavLink>
          <NavLink to="/singers" activeClassName="selected"><span>歌手</span></NavLink>
          <NavLink to="/rank" activeClassName="selected"><span>排行榜</span></NavLink>
        </div>
        : null
      }
      { renderRoutes(route.routes)}
    </div>
  )
}

export default React.memo(Home);