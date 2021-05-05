import React, { useEffect } from 'react';
import { getAlbumDetailRequest } from '../../api/request'
function Album (props) {
  const { match } = props;
  const id = match.params.id;
  useEffect(() => {
    getAlbumDetailRequest(id).then(res => {
      console.log(res)
    })
  }, [])
  return (
    <div>Singers</div>
  )
}

export default React.memo (Album);