import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classnames  from 'classnames';
import { Button, Table } from 'antd'
import './style.less'
import { getName } from '../../api/utils'
import { connect } from 'react-redux';
import { changePlayList, changeCurrentIndex, changeSequecePlayList } from './../../pages/Player/store/actionCreators';
import moment from 'moment'
import { getCommentListRequest, sendCommentRequest } from '../../api/request'
import { Pagination, Input, message } from 'antd'
function SongsList (props) {
  const { id, songs, commentCount, singerDetail = '', changePlayListDispatch, changeCurrentIndexDispatch, changeSequecePlayListDispatch } = props
  const [option, setOption] = useState(0)
  const [count, setCount] = useState(1)
  const [comments, setComments] = useState([])
  const [hotComments, setHotComments] = useState([])
  const [total, setTotal] = useState(0)
  const [value, setValue] = useState('')

  const selectItem = useCallback((e, index) => {
    changeCurrentIndexDispatch(index);
    changePlayListDispatch(songs);
    changeSequecePlayListDispatch(songs);
  }, [changeCurrentIndexDispatch, changePlayListDispatch, changeSequecePlayListDispatch, songs])
  useEffect(() => {
    if (!id) return;
    getCommentListRequest(id, (count - 1) * 20).then(res => {
      setHotComments(res.hotComments)
      setComments(res.comments)
      setTotal(res.total)
    })
  }, [count, id])
  const sendComment = () => {
    sendCommentRequest(1, 2, id, value).then(res => {
      console.log(res)
      if (!res.code) {
        message.info('需要登录')
      }
      setValue('')
      getCommentListRequest(id, (count - 1) * 20).then(res => {
        setHotComments(res.hotComments)
        setComments(res.comments)
        setTotal(res.total)
      })
    })
  }
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'id',
        width: 116,
        render: (item, songs, index) => {
          let indexs = index + 1;
          let myIndex = indexs > 9 ? indexs : '0' + indexs
          return (
            <div key={item} style={{paddingLeft: '32px', color: '#9B9B9B'}} className={classnames({
              dark: index % 2 === 0
            })} onClick={(e) => selectItem(e, index)}>{myIndex}</div>
          )
        }
      },
      {
        title: '音乐标题',
        dataIndex: 'name',
        width: 670,
        render: (item, songs, index) => {
          return (
            <div key={item} className={classnames({
              dark: index % 2 === 0
            })} onClick={(e) => selectItem(e, index)}>
              <span>{item}</span>
              <span style={{marginLeft: '10px', color: '#9B9B9B'}}>{songs.alia.length !== 0 && `(${songs.alia[0]})`}</span>
            </div>
          )
        }
      },
       {
         title: '歌手',
         dataIndex: 'ar',
         width: 324,
         render: (item, songs, index) => {
           return (
             <div key={item} style={{color: '#676767'}} className={classnames({
              dark: index % 2 === 0
            })} onClick={(e) => selectItem(e, index)}>{getName(item)}</div>
           )
         }
       }, 
       {
         title: '专辑',
         dataIndex: 'al',
         width: 436,
         render: (item, songs, index) => {
           return (
             <div key={item} style={{color: '#676767'}} className={classnames({
              dark: index % 2 === 0
            })} onClick={(e) => selectItem(e, index)}>{item.name}</div>
           )
         }
       },
       {
         title: '时长',
         dataIndex: 'dt',
         width: 158,
         render: (item, songs, index) => {
           return (
             <div key={item} style={{color: '#9B9B9B'}} className={classnames({
              dark: index % 2 === 0
            })} onClick={(e) => selectItem(e, index)}>{moment(item).format('mm:ss')}</div>
           )
         }
       }
    ]
  }, [selectItem])
  return (
    <div className="songList">
      <div className="menu">
        <div onClick={() => {setOption(0)}} className={classnames({
          selected: option === 0
        })}>歌曲列表</div>
        {id && (
           <div onClick={() => {setOption(1)}} className={classnames({
            selected: option === 1
          })}>
            评论({commentCount})
          </div>
        )}
        {
          singerDetail && 
          <div onClick={() => {setOption(2)}} className={classnames({
            selected: option === 2
          })}>
            歌手详情
          </div>
        }
      </div>
      {
        option === 0 && <Table dataSource={songs} columns={columns} pagination={false}/>
      }
      {
        option === 1 && (
          <div style={{padding: '0 32px'}}>
            <Input.TextArea style={{ marginBottom: '18px' }} onChange={(e) => {setValue(e.target.value)}} value={value}/>
            <Button style={{ float: 'right' }} onClick={sendComment}>评论</Button>
            { hotComments && hotComments.length !== 0 && count === 1 && (
              <>
                <div style={{margin: '16px 0'}}>精彩评论</div>
                <div>{hotComments.map((item, index) => {
                  
                  return (
                    <div key={item.time} style={{display: 'flex', height: '76px', borderBottom: '1px solid #F2F2F2', alignItems: 'center'}}>
                      <img src={item.user.avatarUrl} width="36px" height="36px" alt="" style={{ borderRadius: '50%', marginRight: '14px' }}/>
                      <div>
                        <div>{item.user.nickname}:{item.content}</div>
                        <div style={{color: '#9F9F9F'}}>{moment(item.time).format('YYYY-MM-DD HH:MM')}</div>
                    </div>
                    </div>
                  )
                })}</div>
              </>
            )}
            {
              comments && comments.length !== 0 && (
                <>
                  <div style={{marginTop: '32px'}}>最新评论</div>
                  <div>{comments.length !== 0 && comments.map((item, index) => {
                    return (
                      <div key={item.time} style={{display: 'flex', height: '76px', borderBottom: '1px solid #F2F2F2', alignItems: 'center'}}>
                        <img src={item.user.avatarUrl} width="36px" height="36px" alt="" style={{ borderRadius: '50%', marginRight: '14px' }}/>
                        <div>
                          <div>{item.user.nickname}:{item.content}</div>
                          <div style={{color: '#9F9F9F'}}>{moment(item.time).format('YYYY-MM-DD HH:mm')}</div>
                      </div>
                      </div>
                    )
                  })}</div>
                </>
              )
            }
            
            { total ? <Pagination current={count} onChange={(page) => {setCount(page)}} total={total} hideOnSinglePage pageSize={20} pageSizeOptions={[20]}/> : null}
          </div>
        )
      }
      {
        option === 2 && <div className="singerDetail">{singerDetail}</div>
      }
      <div style={{height: '60px'}}></div>
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


// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SongsList));