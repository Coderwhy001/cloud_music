import React, { useEffect, useState } from 'react';
import { getRankListRequest } from '../../api/request'
import { filterIndex } from '../../api/utils'
import IconFont from '../../assets/IconFont'
import { renderRoutes } from 'react-router-config';
import './style.less'

function Rank (props) {
  const isRankPage = isNaN(Number(props.location.pathname.slice(-1))) ? true : false;
  const [officialList, setOfficialList] = useState([])
  const [globalList, setGlobalList] = useState([])
  useEffect(() => {
    getRankListRequest().then(res => {
      const index = filterIndex(res.list)
      setOfficialList(res.list.slice(0, index))
      setGlobalList(res.list.slice(index))
    })
  }, [])

  const enterDetail = (id) => {

    props.history.push(`/rank/${id}`)
  }

  return (
    <div className="rank">
      {
        isRankPage && (
          <div className="rank__content">
            <div className="item__wrapper">
              <h1 className="offical">官方榜</h1>
              <div className="offical__list">
                {
                  officialList.map((item, index) => {
                    return (
                      <div key={`${item.coverImgId}${index}`} className="offical__list__item" onClick={() => {enterDetail(item.id)}}>
                        <div className="img_wrapper">
                          <img src={item.coverImgUrl} alt=""/>
                          <div className="decorate"></div>
                          <span className="update_frequecy">{item.updateFrequency}</span>
                        </div>
                        {
                          item.tracks && (
                            <div className="songList">
                              {
                                item.tracks.map((item, index) => {
                                  return (
                                    <div key={index}>
                                      <span className="song">{index+1}. {item.first}</span>
                                      <span className="singer">{item.second}</span>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          )
                        }
                      </div>
                    )
                  })
                }
              </div>
              <h1 className="global">全球榜</h1>
              <div className="global__list">
                {
                  globalList.map((item, index) => {
                    return (
                      <div key={`${item.coverImgId}${index}`} className="global__list__item">
                        <div className="img__wrapper" onClick={() => {enterDetail(item.id)}}>
                          <div className="decorate"></div>
                          <img src={item.coverImgUrl} alt=""/>
                          <div className="play_count">
                            <IconFont type="iconbofang1" style={{ marginRight: '4px'}}/>
                            <span className="count">{Math.floor(item.playCount/10000)}万</span>
                          </div>
                        </div>
                        <div>{item.name}</div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
        </div>
        )
      }
      {renderRoutes(props.route.routes)}
    </div>
  )
}

export default React.memo (Rank);