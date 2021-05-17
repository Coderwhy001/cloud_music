import classNames from 'classnames';
import React from 'react';
import './style.less'
function Horizen(props) {
  const { title, data = [], value, onChange } = props;
  return (
    <div className="Horizen">
      <div className={classNames({ charTitle: title === '筛选:' })}>{title}</div>
      {data.map((item, index) => {
        return (
          <div key={item.key} onClick={() => { onChange(item.key) }} className={classNames('item', {
            lastIndex: index === data.length - 1,
            char: title === '筛选:' && index !== 0,
            charS: item.name === 'S'
          })}>
            <div className={classNames({selected: value === item.key})}>{item.name}</div>
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(Horizen);