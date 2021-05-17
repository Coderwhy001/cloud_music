import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import './style.less';
import { renderRoutes } from "react-router-config";
import IconFont from '../../assets/IconFont'
import { NavLink } from 'react-router-dom';
import Player from '../Player/index'
import { Button, Dropdown, Input, message, Modal } from 'antd'
import { connect } from 'react-redux';
import { getHotKeyWordsRequest, getLoginStatus, getSuggestListRequest, loginByPhoneRequest, checkRegisterRequest, registerRequest } from '../../api/request'
import { debounce, getName } from '../../api/utils';
import { getSongDetail } from '../Player/store/actionCreators';
import classNames from 'classnames';

function Home(props) {
  const { route, location, getSongDetailDispatch, history } = props;
  const queryRef = useRef()
  const [query, setQuery] = useState('')
  const [hotSongs, setHotSongs] = useState([])
  const [visible, setVisible] = useState(false)
  const [searchInfo, setSearchInfo] = useState([])
  const [loginStatu, setLoginStatu] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phone, setPhone] = useState('')
  const [passWord, setPassWord] = useState('')
  const [userInfo, setUserInfo] = useState([])
  const [isLoginPage, setIsLoginPage] = useState(true)
  const isNotDetailPage = isNaN(Number(location.pathname.slice(-1))) ? true : false;
  
  const selectItem = useCallback((e, id) => {
    getSongDetailDispatch(id);
  }, [getSongDetailDispatch])
  const searchResult = useMemo(() => {
    return (
      <div className="searchResult">
        {
          searchInfo && searchInfo.length !== 0 ? (
            <>
              <div style={{height: '32px', lineHeight: '32px', marginLeft: '10px'}}>搜“{query}”相关的结果</div>
              {
                searchInfo.songs && (
                  <div>
                    <div className="title">单曲</div>
                    {
                      searchInfo.songs.map((item, index) => {
                        return (
                          <div className="item" onClick={(e) => selectItem(e, item.id)}>{item.name} - {getName(item.artists)}</div>
                        )
                      })
                    }
                  </div>
                )
              }
              {
                searchInfo.artists && (
                  <div>
                    <div className="title">歌手</div>
                    <div>
                      {
                        searchInfo.artists.map((item, index) => {
                          return (
                            <div className="item" onClick={() => {props.history.push(`/singers/${item.id}`); setVisible(false)}}>{item.name}</div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              }
              
              {
                searchInfo.playlists && (
                  <div>
                    <div className="title">歌单</div>
                    <div>
                      {
                      searchInfo.playlists.map((item, index) => {
                          return (
                            <div className="item" onClick={() => {props.history.push(`/album/${item.id}`); setVisible(false)}}>{item.name}</div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              }
            </>
          ) : (
            <>
              <div style={{margin: '18px 0 14px 20px'}}>热门搜索</div>
                <ul style={{paddingLeft: '20px'}}>
                {
                  hotSongs.map(item => {
                    return (
                      <li className="hotSongs" key={item.first} onClick={() => {queryRef.current.value = item.first; setQuery(item.first)}}>
                        <span>{item.first}</span>
                      </li>
                    )
                  })
                }
              </ul>
            </>
          )
        }
        
      </div>
    )
  }, [hotSongs, searchInfo, props.history, query, selectItem])

  const handleChange = (e) => {
    let val = e.currentTarget.value
    setQuery(val);
  };
  
  let handleQueryDebounce = useMemo(() => {
    return debounce((query) => {
      // getResultSongsListRequest(query).then(res => {
      //   setSongsList(res.result.songs)
      // })
      getSuggestListRequest(query).then(res => {
        setSearchInfo(res.result)
      })
    }, 500);
  }, []);

  const login = useCallback(() => {
    checkRegisterRequest(phone).then(res => {
      if (res.exist === -1) {
        message.warn('需要注册')
      } else if (res.exist === 1) {
        loginByPhoneRequest(phone, passWord).then(res => {
          if (res.code === 200) {
            document.cookie = res.cookie;
            setLoginStatu(1)
            localStorage.setItem('phone', phone)
            localStorage.setItem('password', passWord)
            setUserInfo(res.profile)
            setIsModalVisible(false)
          }
        })
      }
    })
  }, [passWord, phone])
  useEffect(() => {
    if (!visible) return;
    handleQueryDebounce(query);
    // eslint-disable-next-line 
  }, [query]);

  useEffect(() => {
    
    getHotKeyWordsRequest().then(res => {
      setHotSongs(res.result.hots || [])
    })
    getLoginStatus().then(res => {
      console.log()
      if (!res.data.profile && !res.data.account) {
        setLoginStatu(0)
      } else {
        setLoginStatu(1)
        setUserInfo(res.data.profile)
      }
    })
    const phone = localStorage.getItem('phone')
    const password = localStorage.getItem('password')
    if (phone && password) {
      setPhone(phone)
      setPassWord(password)
    }
  }, [])
  const handleUser = () => {
    if (!loginStatu) {
      setIsModalVisible(true)
    } else {
      props.history.push(`/user/${userInfo.userId}`)
    }
  }
  console.log(phone, passWord)
  return (
    <div className="home">
      {visible && <div style={{ width: '1903px', height: '952px', zIndex: '1001', position: 'absolute'}} onClick={() => {setVisible(false)}}></div>}
      <div>
        <div className="home__top">
          <IconFont type="iconwangyiyun" style={{ fontSize: '26px', marginLeft: '18px', marginRight: '4px' }} />
          <span className="home__top__title">网易云音乐</span>
          <span className="input-group-wrapper">
            <span className={classNames('input-wrapper', { visible: visible })}>
              <span className="input-group-addon"><IconFont type="iconsearch" /></span>
              <Dropdown overlay={searchResult}  visible={visible}>
                <input className='input' ref={queryRef} placeholder='搜索' onFocus={() => {setVisible(true)}} onChange={handleChange}></input>
              </Dropdown>
            </span>
          </span>
          <span style={{marginLeft: '1040px', color: '#F8BABA', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center'}} onClick={handleUser}>
            { userInfo.avatarUrl ? <img src={userInfo.avatarUrl} alt="" width="30px" height="30px" style={{borderRadius: '50%', marginRight: '4px'}}/> : <IconFont type="iconyonghu2" style={{fontSize: '30px', marginRight: '4px'}}/>}
            <span>
              <span style={{marginRight: '6px'}}>{loginStatu && userInfo ? userInfo.nickname : '未登录'}</span>
              <IconFont type="iconzhankai" />
            </span>
          </span>
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
      </div>
      { renderRoutes(route.routes)}
      <Player></Player>
      <Modal visible={isModalVisible} mask={false} onCancel={() => {setIsModalVisible(false)}} footer={null} centered maskClosable={false}>
        <div>
          {!isLoginPage && <span className="return" onClick={() => {setIsLoginPage(true)}}>返回登录</span>}
          <div style={{marginTop: '100px', width: '262px'}}>
            <Input addonBefore={<IconFont type="iconshouji"/>} placeholder="请输入手机号" value={phone} onChange={(e) => {setPhone(e.target.value)}} />
            <Input addonBefore={<IconFont type="iconsuo"/>} placeholder="请输入密码" value={passWord} onChange={(e) => {setPassWord(e.target.value)}}/>
          </div>
          <Button onClick={login} style={{width: '262px', height: '40px', margin: '30px 0 18px 0', background: '#EA4848', color: '#fff'}}>
            {isLoginPage ? '登录' : '注册'}
          </Button>
          {isLoginPage && <div style={{textAlign:'center', cursor: 'pointer'}} onClick={() => {setIsLoginPage(false)}}>注册</div>}
        </div>
      </Modal>
    </div>
  )
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getSongDetailDispatch(id) {
      dispatch(getSongDetail(id));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Home));