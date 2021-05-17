import React, { useEffect, useState } from 'react';
import { getUserAlbumRequest, getCollectedSinger, getUserInfoDetail, loginOutRequest } from '../../api/request'
import IconFont from '../../assets/IconFont'
import './style.less'
function User (props) {
  const { match, history } = props;
  const id = match.params.id;
  const [userInfo, setUserInfo] = useState([])
  const [userLevel, setUserLevel] = useState(0)
  const [playList, setPlayList] = useState([])
  const [singerList, setSingerList] = useState([]);

  useEffect(() => {
    getUserAlbumRequest(id).then(res => {
      setPlayList(res.playlist)
    })
    getCollectedSinger().then(res => {
      setSingerList(res.data)
    })
    getUserInfoDetail(id).then(res => {
      setUserInfo(res.profile)
      setUserLevel(res.level)
    })
  }, [id])
  const enterDetail = (id) => {
    history.push(`/album/${id}`)
  }
  const enterSingerDetail = (id) => {
    history.push(`/singers/${id}`)
  }
  const loginout = () => {
    loginOutRequest().then(res => {
      window.location.href = 'http://localhost:3001';
    })
  }
  return (
    <div className="user">
      <div className="user__detail">
        <img src={userInfo.avatarUrl} alt="" width="184px" height="184px" />
        <div className="user__detail__desc">
          <div className="name">{userInfo.nickname}</div>
          <div className="title">
            <span className="lv">Lv{userLevel}</span>
            <span className="loginout" onClick={loginout}>退出登录</span>
          </div>
          <div className="number">
            <span className="follow">关注： {userInfo.follows}</span>
            <span>粉丝： {userInfo.followeds}</span>
          </div>
        </div>
      </div>
      <div className="songs__list">
        <div className="title">我的歌单</div>
        <div className="list">
          {
            playList.map((item, index) => {
              return (
                <div className="ListItem" key={item.id}>
                  <div className="img_wrapper" onClick={() => {enterDetail(item.id)}}>
                    <div className="decorate"></div>
                    <img src={item.coverImgUrl + "?param=277x277"} width="100%" height="100%" alt="music"/>
                    <div className="play_count">
                      <IconFont type="iconbofang1" style={{ marginRight: '4px'}}/>
                      <span className="count">{item.playCount > 10000 ? Math.floor(item.playCount/10000) : item.playCount}{item.playCount > 10000 && '万'}</span>
                    </div>
                  </div>
                  <div className="desc">{item.name}</div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="songs__list">
        <div className="title">收藏的歌手</div>
        <div className="list">
          {
            singerList.map((item, index) => {
              return (
                <div className="ListItem" key={item.id}>
                  <div className="img_wrapper" onClick={() => {enterSingerDetail(item.id)}}>
                    <div className="decorate"></div>
                    <img src={item.picUrl + "?param=277x277"} width="100%" height="100%" alt="music"/>
                  </div>
                  <div className="desc">{item.name}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default React.memo (User);