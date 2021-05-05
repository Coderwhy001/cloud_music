import React from 'react';
import './style.less'
import IconFont from '../../assets/IconFont'
import { withRouter } from 'react-router';
function List (props) {
  const { recommendList, history } = props;
  const enterDetail = (id) => {
    history.push(`/recommend/${id}`)
  }
  return (
    <div className="List">
        {
          recommendList.map(item => {
            return (
              <div className="ListItem" key={item.id} onClick={() => {enterDetail(item.id)}}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                  <div className="play_count">
                    <IconFont type="iconbofang1" style={{ marginRight: '4px'}}/>
                    <span className="count">{Math.floor(item.playCount/10000)}万</span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </div>
            )
          })
        }
      </div>
  )
}

export default withRouter(React.memo (List));