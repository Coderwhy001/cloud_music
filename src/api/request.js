import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get("/banner");
};
export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized");
};
export const getAlbumDetailRequest = id => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};
export const getAlbumSongUrlRequest = id => {
  return axiosInstance.get(`/song/url?id=${id}`)
}
export const getHotSingerListRequest = count => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (type, area, alpha, count) => {
  return axiosInstance.get(
    `/artist/list?type=${type}&area=${area}&initial=${alpha}&offset=${count}`
  );
};

export const getSingerInfoRequest = id => {
  return axiosInstance.get(`/artists?id=${id}`);
};

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};

export const getSongDetailRequest = id => {
  return axiosInstance.get(`/song/detail?ids=${id}`);
};

export const getLyricRequest = id => {
  return axiosInstance.get(`/lyric?id=${id}`);
};
export const getHotKeyWordsRequest = () => {
  return axiosInstance.get(`/search/hot`);
};
export const getResultSongsListRequest = query => {
  return axiosInstance.get(`/search?keywords=${query}`);
};

export const getSuggestListRequest = query => {
  return axiosInstance.get(`/search/suggest?keywords=${query}`);
};

export const getCommentListRequest = (id, offset) => {
  return axiosInstance.get(`/comment/playlist?id=${id}&offset=${offset}&timestamp=` + Date.now())
}

export const sendCommentRequest = (t, type, id, content) => {
  return axiosInstance.get(`/comment?t=${t}&type=${type}&id=${id}&content=${content}`)
}

export const getLoginStatus = () => {
  return axiosInstance.get(`/login/status&timestamp=` + Date.now())
}

export const loginByPhoneRequest = (phone, password) => {
  return axiosInstance.get(
    `/login/cellphone?phone=${phone}&password=${password}`
  );
};

export const checkRegisterRequest = (phone) => {
  return axiosInstance.get(`/cellphone/existence/check?phone=${phone}`)
}
export const registerRequest = (phone, password, nickname) => {
  return axiosInstance.get(`/register/cellphone?phone=${phone}&password=${password}&nickname=${phone}`)
}
export const getCollectedSinger = (id) => {
  return axiosInstance.get(`/artist/sublist?timestamp=` + Date.now())
}
export const collectSingerRequest = (id, t) => {
  return axiosInstance.get(`/artist/sub?id=${id}&t=${t}&timestamp=` + Date.now())
}
export const getUserAlbumRequest = (id) => {
  return axiosInstance.get(`/user/playlist?uid=${id}&timestamp=` + Date.now())
}
export const collectAlbumRequest = (t, id) => {
  return axiosInstance.get(`/playlist/subscribe?t=${t}&id=${id}&timestamp=` + Date.now())
}
export const getIsCollectRequest = (id) => {
  return axiosInstance.get(`/playlist/detail/dynamic?id=${id}&timestamp=` + Date.now())
}
export const getUserInfoDetail = (id) => {
  return axiosInstance.get(`/user/detail?uid=${id}`)
}
export const loginOutRequest = () => {
  return axiosInstance.get('/logout')
}