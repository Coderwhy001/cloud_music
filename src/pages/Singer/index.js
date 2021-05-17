import React, { useEffect, useState } from 'react';
import { getSingerInfoRequest, getCollectedSinger, collectSingerRequest } from '../../api/request'
import {Button} from 'antd'
import IconFont from '../../assets/IconFont';
import SongsList from '../../components/SongsList'
import './style.less'
function Singer (props) {
  const id = props.match.params.id;
  const [singerInfo, setSingerInfo] = useState([])
  const [hotSongs, setHotSongs] = useState([])
  const [isCollected, setIsCollected] = useState(false)
  useEffect(() => {
    getSingerInfoRequest(id).then(res => {
      setSingerInfo(res.artist)
      setHotSongs(res.hotSongs)
    })
    getCollectedSinger().then(res => {
      res.data.forEach(item => {
        if (item.id == id) {
          console.log('---')
          setIsCollected(true)
        }
      })
    })
  }, [id])
  const collectSinger = () => {
    collectSingerRequest(id, isCollected ? 2 : 1).then(res => {
      getCollectedSinger().then(res => {
        const ids = res.data.map(item => item.id)
        if (ids.indexOf(Number(id)) > -1) {
          setIsCollected(true)
        } else {
          setIsCollected(false)
        }
      })
    })
  }
  return (
    <div className="singer">
      <div className="singer__detail">
        <div className="img_wrapper">
          <img src={singerInfo ? singerInfo.img1v1Url : ''} alt=""/>
        </div>
        <div className="singer__desc">
          <div className="title">{singerInfo.name}</div>
          <div className="name">{singerInfo.alias ? singerInfo.alias[0] : ''}</div>
          <div className="collect">
              <Button shape="round" size="large" onClick={collectSinger}>
                <IconFont type="iconjiahao" />
                <span style={{marginLeft: '6px'}}>{isCollected ? '已收藏' : '收藏'}</span>
              </Button>
          </div>
          <div className="number">
            <span style={{marginRight: '20px'}}>单曲数：{singerInfo.musicSize}</span>
            <span>MV数：{singerInfo.mvSize}</span>
          </div>
        </div>
      </div>
      <SongsList songs={hotSongs} singerDetail={singerInfo.briefDesc}/>
    </div>
  )
}

export default React.memo (Singer);