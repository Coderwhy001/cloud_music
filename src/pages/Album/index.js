import React, { useEffect, useState, useCallback } from 'react';
import { getAlbumDetailRequest, getIsCollectRequest, collectAlbumRequest } from '../../api/request'
import './style.less'
import moment from 'moment'
import {Button} from 'antd'
import IconFont from '../../assets/IconFont';
import SongsList from '../../components/SongsList'
import { connect } from 'react-redux';
import { changePlayList, changeCurrentIndex, changeSequecePlayList } from '../Player/store/actionCreators';
import { findPage } from '../../api/utils'

function Album (props) {
  const { match, changePlayListDispatch, changeCurrentIndexDispatch, changeSequecePlayListDispatch } = props;
  const page = findPage(props.match.path)
  const id = match.params.id;
  const [currentAlbum, setCurrentAlbum] = useState([]);
  const [creatorInfo, setCreatorInfo] = useState({});
  const [desc, setDesc] = useState('')
  const [tags, setTags] = useState('')
  const [tracks, setTracks] = useState([])
  const [isCollected, setIsCollected] = useState(false)
  const [disable, setDisable] = useState(false)
  useEffect(() => {
    getAlbumDetailRequest(id).then(function(res) {
      let str = res.playlist.tags.reduce((prev, cur) => {
        return prev += ' / ' + cur
      }, '')
      setCurrentAlbum(res.playlist)
      setCreatorInfo(res.playlist.creator)
      setDesc(res.playlist.description)
      setTags(str.slice(3))
      setTracks(res.playlist.tracks)
      setDisable(res.playlist.userId == '570170360')
    })
    getIsCollectRequest(id).then(res => {
      setIsCollected(res.subscribed)
    })
  }, [id])

  const selectItem = useCallback((e, index) => {
    changeCurrentIndexDispatch(index);
    changePlayListDispatch(tracks);
    changeSequecePlayListDispatch(tracks);
  }, [changeCurrentIndexDispatch, changePlayListDispatch, changeSequecePlayListDispatch, tracks])
  const collectAlbum = () => {
    collectAlbumRequest(isCollected ? 2 : 1, id).then(res => {
      getIsCollectRequest(id).then(res => {
        setIsCollected(res.subscribed)
      })
    })
  }
  return (
    <div className="album">
      <div className="album__detail">
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum ? currentAlbum.coverImgUrl : ''} alt=""/>
        </div>
        <div className="album__desc">
          <div className="album__desc__title">
            <div className="album__desc__title__label">歌单</div>
            <div className="album__desc__title__name">{currentAlbum ? currentAlbum.name : ''}</div>
          </div>
          <div className="album__desc__creator">
            <img src={creatorInfo.avatarUrl} alt=""/>
            <div className="album__desc__creator__name">{creatorInfo.nickname}</div>
            { page !== 'rank' ? (
              <div className="album__desc__creator__time">{moment(currentAlbum.createTime).format('YYYY-MM-DD')}创建</div>
            ) : (
              <div className="album__desc__creator__time">最近更新：{moment(currentAlbum.updateTime).format('M月DD')}日</div>
            )}
            
          </div>
          <div className="album__desc__button">
            <div className="play">
              <Button shape="round" size="large">
                <IconFont type="iconbofang2" />
                <span style={{marginLeft: '6px'}} onClick={(e) => selectItem(e, 0)}>播放全部</span>
              </Button>
            </div>
            <div className="collect">
              <Button shape="round" size="large" onClick={collectAlbum} disabled={disable}>
                <IconFont type="iconjiahao" />
                <span style={{marginLeft: '6px'}}>{isCollected ? '已收藏' : '收藏'}</span>
              </Button>
            </div>
          </div>
          { tags && (
            <div className="album__desc__label">
            <div>标签 : {tags}</div>
          </div>
          )}
          <div className="album__desc__song">
            <div className="num">歌曲 : {currentAlbum.trackCount}</div>
            <div className="playCount">播放 : {currentAlbum.playCount/10000 > 9 ? Math.floor(currentAlbum.playCount/10000) + '万' : currentAlbum.playCount}</div>
          </div>
          {
            desc && (
              <div className="album__desc__text">
                <div>简介 : {desc.indexOf('\n') === -1 ? desc : desc.slice(0, desc.indexOf('\n')) + '...'}</div>
              </div>
            )
          }
        </div>
      </div>
      <SongsList songs={tracks} commentCount={currentAlbum.commentCount} id={id}/>
    </div>
  )
}


// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  currentSong: state.getIn(['player', 'currentSong']),
  scrollY: state.getIn(['album', 'scrollY'])  
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    changePlayListDispatch(data){
      dispatch(changePlayList(data));
    },
    changeCurrentIndexDispatch(data) {
      dispatch(changeCurrentIndex(data));
    },
    changeSequecePlayListDispatch(data) {
      dispatch(changeSequecePlayList(data))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));