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
            <div className="album__desc__title__label">??????</div>
            <div className="album__desc__title__name">{currentAlbum ? currentAlbum.name : ''}</div>
          </div>
          <div className="album__desc__creator">
            <img src={creatorInfo.avatarUrl} alt=""/>
            <div className="album__desc__creator__name">{creatorInfo.nickname}</div>
            { page !== 'rank' ? (
              <div className="album__desc__creator__time">{moment(currentAlbum.createTime).format('YYYY-MM-DD')}??????</div>
            ) : (
              <div className="album__desc__creator__time">???????????????{moment(currentAlbum.updateTime).format('M???DD')}???</div>
            )}
            
          </div>
          <div className="album__desc__button">
            <div className="play">
              <Button shape="round" size="large">
                <IconFont type="iconbofang2" />
                <span style={{marginLeft: '6px'}} onClick={(e) => selectItem(e, 0)}>????????????</span>
              </Button>
            </div>
            <div className="collect">
              <Button shape="round" size="large" onClick={collectAlbum} disabled={disable}>
                <IconFont type="iconjiahao" />
                <span style={{marginLeft: '6px'}}>{isCollected ? '?????????' : '??????'}</span>
              </Button>
            </div>
          </div>
          { tags && (
            <div className="album__desc__label">
            <div>?????? : {tags}</div>
          </div>
          )}
          <div className="album__desc__song">
            <div className="num">?????? : {currentAlbum.trackCount}</div>
            <div className="playCount">?????? : {currentAlbum.playCount/10000 > 9 ? Math.floor(currentAlbum.playCount/10000) + '???' : currentAlbum.playCount}</div>
          </div>
          {
            desc && (
              <div className="album__desc__text">
                <div>?????? : {desc.indexOf('\n') === -1 ? desc : desc.slice(0, desc.indexOf('\n')) + '...'}</div>
              </div>
            )
          }
        </div>
      </div>
      <SongsList songs={tracks} commentCount={currentAlbum.commentCount} id={id}/>
    </div>
  )
}


// ??????Redux?????????state????????????props???
const mapStateToProps = (state) => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  currentSong: state.getIn(['player', 'currentSong']),
  scrollY: state.getIn(['album', 'scrollY'])  
});
// ??????dispatch???props???
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