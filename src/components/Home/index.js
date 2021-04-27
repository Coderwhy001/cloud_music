import React from 'react';
import './style.css';
import { renderRoutes } from "react-router-config";
function Home (props) {
  const { route } = props;
  console.log(props)
  return (
    <div className="home">
      <div className="home__top">
        <span>网易云音乐</span>
      </div>
      { renderRoutes (route.routes) }
    </div>
  )
}

export default React.memo (Home);