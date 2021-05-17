import axios from "axios";

export const baseUrl = "http://localhost:3000";

// axios的实例及拦截器配置
const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials:true
});

axiosInstance.interceptors.response.use(
  res => res.data,
  err => err
);

export { axiosInstance };

export const languageType = [
  {
    name: '全部',
    key: '-1',
  },
  {
    name: '华语',
    key: '7',
  },
  {
    name: '欧美',
    key: '96',
  },
  {
    name: '日本',
    key: '8',
  },
  {
    name: '韩国',
    key: '16'
  },
  {
    name: '其他',
    key: '0'
  }
]

export const singerType = [
  {
    name: '全部',
    key: '-1'
  },
  {
    name: '男歌手',
    key: '1',
  },
  {
    name: '女歌手',
    key: '2'
  },
  {
    name: '乐队组合',
    key: '3'
  }
]

//歌手首字母
export const alphaTypes = [
  {
    key: '',
    name: '热门'
  },
  {
    key: "a",
    name: "A"
  },
  {
    key: "b",
    name: "B"
  },
  {
    key: "c",
    name: "C"
  },
  {
    key: "d",
    name: "D"
  },
  {
    key: "e",
    name: "E"
  },
  {
    key: "f",
    name: "F"
  },
  {
    key: "g",
    name: "G"
  },
  {
    key: "h",
    name: "H"
  },
  {
    key: "i",
    name: "I"
  },
  {
    key: "j",
    name: "J"
  },
  {
    key: "k",
    name: "K"
  },
  {
    key: "l",
    name: "L"
  },
  {
    key: "m",
    name: "M"
  },
  {
    key: "n",
    name: "N"
  },
  {
    key: "o",
    name: "O"
  },
  {
    key: "p",
    name: "P"
  },
  {
    key: "q",
    name: "Q"
  },
  {
    key: "r",
    name: "R"
  },
  {
    key: "s",
    name: "S"
  },
  {
    key: "t",
    name: "T"
  },
  {
    key: "u",
    name: "U"
  },
  {
    key: "v",
    name: "V"
  },
  {
    key: "w",
    name: "W"
  },
  {
    key: "x",
    name: "X"
  },
  {
    key: "y",
    name: "Y"
  },
  {
    key: "z",
    name: "Z"
  }
];

// 倍速播放配置
export const list = [
  {
    key: 0.75,
    name: "x0.75"
  },
  {
    key: 1,
    name:"x1"
  }, 
  {
    key: 1.25,
    name:"x1.25"
  }, 
  {
    key: 1.5,
    name:"x1.5"
  }, 
  {
    key: 2,
    name:"x2"
  }
]

//播放模式
export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
};
