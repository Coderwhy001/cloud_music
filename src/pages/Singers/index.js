import React, { useEffect, useState, useRef } from 'react';
import Horizen from '../../components/Horizen';
import { languageType, singerType, alphaTypes } from '../../api/config'
import { getSingerListRequest } from '../../api/request'
import './style.less'
import  LazyLoad from 'react-lazyload';
import { renderRoutes } from 'react-router-config';

function Singers (props) {
  let [language, setLanguage] = useState('-1')
  let [singer, setSinger] = useState('-1')
  let [alpha, setAlpha] = useState('')
  let [singerList, setSingerList] = useState([])
  let count = useRef(0)
  let myList = useRef([])
  const isSingersPage = isNaN(Number(props.location.pathname.slice(-1))) ? true : false;
  useEffect(() => {
    if (!isSingersPage) return;
    getSingerListRequest(singer, language, alpha, 0).then(res => {
      setSingerList(res.artists)
      myList.current = res.artists
    })
    const getNewData = function() {
      const maxScrollTop = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const currentScrollTop = document.documentElement.scrollTop
      if (maxScrollTop - currentScrollTop === 0 && isSingersPage) {
        count.current += 30;
        getSingerListRequest(singer, language, alpha, count.current).then(res => {
          myList.current = [...myList.current, ...res.artists]
          setSingerList(myList.current)
        })
      }
    }
    window.addEventListener('scroll', getNewData)
    return () => {
      window.removeEventListener('scroll', getNewData)
    }
  }, [singer, language, alpha, isSingersPage])
  
  const enterDetail = (id)  => {
    props.history.push(`/singers/${id}`);
  };
  
  return (
    <div className="singers">
      {
        isSingersPage ? (
          <div className="singers__content">
        <div className="item__wrapper">
          <div className="top">
            <Horizen title="语种:" data={languageType} value={language} onChange={(value) => {setLanguage(value)}}/>
            <Horizen title="分类:" data={singerType} value={singer} onChange={(value) => {setSinger(value)}}/>
            <Horizen title="筛选:" data={alphaTypes} value={alpha} onChange={(value) => {setAlpha(value)}}/>
          </div>
          <div className="botom">
            <div className="bottom__list">
              {
                singerList.map((item, index) => {
                  return (
                    <div className="ListItem" key={item.id}>
                      <div className="img_wrapper" onClick={() => {enterDetail(item.id)}}>
                        <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music"/>}>
                          <img src={item.img1v1Url} width="193px" height="193px" alt="music"/>
                        </LazyLoad>
                      </div>
                      <div className="desc">{item.name}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
        ) : null
      }
      { renderRoutes(props.route.routes) }
    </div>
  )
}

export default React.memo (Singers);