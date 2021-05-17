import React, {useRef} from 'react';
import { CSSTransition } from 'react-transition-group';
import ProgressCircle from '../../../components/ProgressCircle';
import { getName } from '../../../api/utils';
import { MiniPlayerContainer } from './style';
import { useCallback } from 'react';
import IconFont from '../../../assets/IconFont';


function MiniPlayer(props) {
  const { full, song, playing, percent } = props;
  const { clickPlaying, setFullScreen, togglePlayList } = props;

  const miniPlayerRef = useRef();
  const miniWrapperRef = useRef();
  const miniImageRef = useRef();

  const handleTogglePlayList = useCallback((e) => {
    togglePlayList(true);
    e.stopPropagation();
  }, [togglePlayList]);

  return (
    <CSSTransition 
      in={!full} 
      timeout={400} 
      classNames="mini" 
      onEnter={() => {
        miniPlayerRef.current.style.display = "flex";
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = "none";
      }}
    >
      <MiniPlayerContainer ref={miniPlayerRef}>
        <div className="icon">
          <div className="imgWrapper" ref={miniWrapperRef} onClick={() => setFullScreen(true)}>
            <img className={`play ${playing ? "": "pause"}`} ref={miniImageRef} src={song.al.picUrl} width="40" height="40" alt="img"/>
          </div>
        </div>
        <div className="text">
          <h2 className="name">
            <span style={{cursor: 'pointer'}} onClick={() => setFullScreen(true)}>{song.name}</span>
          </h2>
          <p className="desc">
            <span style={{cursor: 'pointer'}} onClick={() => setFullScreen(true)}>{getName(song.ar)}</span>
          </p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            { playing ? 
              <IconFont className="icon-mini iconfont icon-pause" type="iconzantingtingzhi1" onClick={e => clickPlaying(e, false)}/>
              :
              <IconFont className="icon-mini iconfont icon-play" type="iconbofang1" onClick={e => clickPlaying(e, true)}/>
            }
          </ProgressCircle>
        </div>
        <div className="control" onClick={handleTogglePlayList}>
          <IconFont type="iconbofangliebiao" className="iconfont" style={{cursor: 'pointer'}}/>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(MiniPlayer);