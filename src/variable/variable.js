import { getCreateColorMethod } from "utils/color";

export const baseURL = "https://ptx.transportdata.tw/MOTC";

export const mainColor = "#F3F4F6";
export const shallowMainColor = "#F4F5F7";
export const lightReceivingColor = "#ffffff";
export const shadowColor = "#D4DBEA";
export const inputShadowColor = "rgba(255, 255, 255, 0.7)";
export const textColor = "#373A43";
export const placeholderColor = "#ACABB0";
export const navBarColor = "#EAEBED";
export const selectedColor =
  "linear-gradient(180deg, #38D0B7 0%, #35B3EA 100%);";
export const selectedShadowColor = "0px 2px 5px #C0C7D0;";
export const seperateBarColor = "#F1F2F2";
export const optionButtonColor = "#646466";
export const blueGreen = "#38D0B7";
export const notoSans = "'Noto Sans TC', sans-serif";
export const roboto = "'Roboto', sans-serif";

export const __FFF__ = (opacity) =>
  `${opacity ? `rgba(255, 255, 255, ${opacity})` : "#FFF"}`;
export const __F6F7FB__ = (opacity) =>
  `${opacity ? `rgba(246, 247, 251, ${opacity})` : "#F6F7FB"}`;
export const __0D0B0C__ = (opacity) =>
  `${opacity ? `rgba(13, 11, 12, ${opacity})` : "#0D0B0C"}`;
export const __FF1D6C__ = getCreateColorMethod([255, 29, 108], "#FF1D6C");
export const __ACACAC__ = (opacity) =>
  `${opacity ? `rgba(172, 172, 172, ${opacity})` : "#ACACAC"}`;
export const __007350__ = (opacity) =>
  `${opacity ? `rgba(0, 115, 80, ${opacity})` : "#007350"}`;
export const __FFB72C__ = getCreateColorMethod([255, 183, 44], "#FFB72C");
export const __D2D2D2__ = getCreateColorMethod([210, 210, 210], "#D2D2D2");

export const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const counties = [
  { en: "", zh: "不分縣市" },





  
  { en: "Taipei", zh: "台北市" },

  { en: "NewTaipei", zh: "新北市" },
  { en: "Taoyuan", zh: "桃園市" },

  { en: "Taichung", zh: "台中市" },

  { en: "Tainan", zh: "台南市" },
  { en: "Kaohsiung", zh: "高雄市" },
  
  { en: "Keelung", zh: "基隆市" },

  { en: "Hsinchu", zh: "新竹市" },
  { en: "HsinchuCounty", zh: "新竹縣" },

  { en: "MiaoliCounty", zh: "苗栗縣" },

  { en: "ChanghuaCounty", zh: "彰化縣" },
  { en: "NantouCounty", zh: "南投縣" },

  { en: "YunlinCounty", zh: "雲林縣" },

  { en: "ChiayiCounty", zh: "嘉義縣" },
  { en: "Chiayi", zh: "嘉義市" },

  { en: "PingtungCounty", zh: "屏東縣" },

  { en: "YilanCounty", zh: "宜蘭縣" },
  { en: "HualienCounty", zh: "花蓮縣" },

  { en: "TaitungCounty", zh: "台東縣" },
  
  { en: "KinmenCounty", zh: "金門縣" },
  { en: "PenghuCounty", zh: "澎湖縣" },

  { en: "LienchiangCounty", zh: "連江縣" },
];
