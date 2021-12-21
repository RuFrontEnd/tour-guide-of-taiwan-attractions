import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { ReactComponent as Triangle } from "assets/triangle_title.svg";
import FilterItems from "layouts/FilterItems";

import { counties } from "variable/variable";
import { getCityScenicSpots } from "api/scenicSpots";
import { getCityActivities } from "api/activities";
import { pushSearchParam } from "utils/url";

const categories = [
  { value: "", content: "不分類別" },
  { value: "scenicSpot", content: "景點" },
  { value: "activity", content: "活動" },
];

const countiesOptions = counties.map((county) => {
  return {
    value: county.en,
    content: county.zh,
  };
});

export const handleClickActivityCard = () => {
  document.body.style.overflow = "hidden";
};

export const handleClickDetailModal = () => {
  document.body.style.overflow = "";
};

export const handleClickDetailCard = (e) => {
  e.stopPropagation();
};

export const getAddresses = (scenicSpots) =>
  scenicSpots.map((scenicSpot) =>
    scenicSpot.Address ? scenicSpot.Address.slice(0, 3) : ""
  );

export const filterCities = (addresses) =>
  addresses.filter((address) => address.match(/.{2}市/));

export const initNumOfOccurrence = (cities) =>
  cities.map((city) => {
    return {
      name: city,
      value: 0,
    };
  });

export const getNumOfCities = (cities, initNumOfCities) => {
  let numOfCities = [...initNumOfCities];
  numOfCities.forEach((numOfCity, index) =>
    cities.forEach((city) => {
      if (numOfCity.name === city) {
        numOfCities[index].value += 1;
      }
    })
  );
  return numOfCities;
};

export const descSortNumOfCites = (numOfCities) =>
  numOfCities.sort((prev, next) => next.value - prev.value);

export const getTopTenCities = (SortedNumOfCites) =>
  SortedNumOfCites.filter((SortedNumOfCity, index) => index < 10);

export const getParamsFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search.slice("1"));
  const _keyword = searchParams.get("keyword");
  const _category = searchParams.get("category");
  const _city = searchParams.get("city");
  return {
    keyword: _keyword,
    category: _category,
    city: _city,
  };
};

const ScenicSpots = (props) => {
  const { history } = props;
  // 篩選相關state
  const [keyword, setKeyword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null); // 下拉選單選擇的城市
  const [qureyParams, setQureyParams] = useState([]);
  // 活動相關 state
  const [totalActivities, setTotalActivities] = useState([]);
  const [activitiesPage, setActivitiesPage] = useState(0);
  const [cityActivities, setCityActivities] = useState([]);
  // 景點相關 state
  const [totalScenicSpots, setTotalScenicSpots] = useState([]);
  const [scenicSpotsPage, setScenicSpotsPage] = useState(1);
  const [cityScenicSpots, setCityScenicSpots] = useState([]);
  // modal詳細資訊
  const [modalInfo, setModalInfo] = useState([]);
  // 顯示狀態
  const [isFirstCardsLoading, setIsFirstCardsLoading] = useState(true);
  const [isSecondCardsLoading, setIsSecondCardsLoading] = useState(true);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const getFilterStateFromSearchParam = () => {
    const urlSearchParams = getParamsFromUrl();
    setKeyword(urlSearchParams.keyword);
    setSelectedCategories(urlSearchParams.category);
    setSelectedCity(urlSearchParams.city);
    setScenicSpotsPage(1);
    setActivitiesPage(1);
    setQureyParams({
      keyword: urlSearchParams.keyword,
      category: urlSearchParams.category,
      city: urlSearchParams.city,
    });
  };

  const putCityActivityInfosToDetailModal = (e) => {
    const targetId = Number(e.currentTarget.dataset.id);
    const _title = cityActivities[targetId]?.ActivityName || "";
    const _description = cityActivities[targetId]?.Description || "";
    const _time =
      `${cityActivities[targetId]?.StartTime?.slice(0, 10)} - ${cityActivities[
        targetId
      ]?.EndTime?.slice(0, 10)}` || "24小時";
    const _fee = cityActivities[targetId].Charge || "免費";
    const _area = cityActivities[targetId].Address || "請聯絡主辦方詢問地點";
    const _tel = cityActivities[targetId].Phone || "暫不提供";
    const filterPictureKeys = Object.keys(
      cityActivities[targetId].Picture
    ).filter((key) => key.match(/PictureUrl[0-9]+/));
    const _images = filterPictureKeys.map((filterPictureKey) => {
      return {
        src: cityActivities[targetId].Picture[filterPictureKey],
        alt: "圖片",
      };
    });

    setIsShowDetail(true);
    setModalInfo({
      title: _title,
      description: _description,
      time: _time,
      fee: _fee,
      area: _area,
      tel: _tel,
      images: _images,
    });
  };

  const putCityScenicspotInfosToDetailModal = (e) => {
    const targetId = Number(e.currentTarget.dataset.id);
    const _title = cityScenicSpots[targetId]?.Name;
    const _description = cityScenicSpots[targetId]?.DescriptionDetail || '';
    const _time = cityScenicSpots[targetId]?.OpenTime || "24小時開放";
    const _fee = "免費";
    const _area = cityScenicSpots[targetId]?.Address || "請聯絡主辦方詢問地點";
    const _tel = cityScenicSpots[targetId]?.Phone || "暫不提供";
    const filterPictureKeys = Object.keys(
      cityScenicSpots[targetId].Picture
    ).filter((key) => key.match(/PictureUrl[0-9]+/));
    const _images = filterPictureKeys.map((filterPictureKey) => {
      return {
        src: cityScenicSpots[targetId].Picture[filterPictureKey],
        alt: "圖片",
      };
    });

    setIsShowDetail(true);
    setModalInfo({
      title: _title,
      description: _description,
      time: _time,
      fee: _fee,
      area: _area,
      tel: _tel,
      images: _images,
    });
  };

  const handleSearch = () => {
    setIsFirstCardsLoading(true);
    setIsSecondCardsLoading(true);
    pushSearchParam([
      { key: "keyword", value: keyword },
      { key: "category", value: selectedCategories },
      { key: "city", value: selectedCity },
      { key: "scenicSpotsPage", value: scenicSpotsPage },
      { key: "activitiesPage", value: activitiesPage },
    ]);
    setQureyParams({
      keyword: keyword,
      category: selectedCategories,
      city: selectedCity,
    });
    setScenicSpotsPage(1);
  };

  const FilterItemsProps = {
    searchInfos: {
      categories: categories,
      counties: countiesOptions,
      selectedCategories: selectedCategories,
      setSelectedCategories: setSelectedCategories,
      selectedCity: selectedCity,
      setSelectedCity: setSelectedCity,
      keyword: keyword,
      setKeyword: setKeyword,
      onClickSearchButton: handleSearch,
    },
    firstSmCardsInfos: {
      isWaiting: isFirstCardsLoading,
      setIsWaiting: setIsFirstCardsLoading,
      title: "活動",
      icon: <Triangle />,
      spots: cityActivities,
      setSpots: setCityActivities,
      onClickCard: putCityActivityInfosToDetailModal,
      countOfWaitingCard: 20,
    },
    secondSmCardsInfos: {
      isWaiting: isSecondCardsLoading,
      setIsWaiting: setIsSecondCardsLoading,
      title: "景點",
      icon: <Triangle />,
      spots: cityScenicSpots,
      setSpots: setCityScenicSpots,
      onClickCard: putCityScenicspotInfosToDetailModal,
      countOfWaitingCard: 20,
    },
    modalInfos: {
      isShowDetail: isShowDetail,
      setIsShowDetail: setIsShowDetail,
      infos: modalInfo,
    },
  };

  useEffect(() => {
    history.listen(() => {
      getFilterStateFromSearchParam();
    }); // 監聽上一頁 / 下一頁
    getFilterStateFromSearchParam();
  }, []);

  useEffect(() => {
    if (selectedCity === null) return;
    getCityActivities(selectedCity).then((data) => {
      const _totalActivities = data.filter(
        (item) =>
          item.Picture.hasOwnProperty("PictureUrl1") &&
          item.hasOwnProperty("City")
      );
      setTotalActivities(_totalActivities);
      let _cityActivities = [];
      if (data.length !== 0 && !qureyParams.keyword) {
        _cityActivities = _totalActivities.slice(
          (scenicSpotsPage - 1) * 20,
          scenicSpotsPage * 20
        );
      } // 篩選城市
      if (data.length !== 0 && qureyParams.keyword) {
        _cityActivities = _totalActivities
          .filter((_totalActivities) => {
            return _totalActivities.ActivityName.includes(qureyParams.keyword);
          })
          .slice((scenicSpotsPage - 1) * 20, scenicSpotsPage * 20);
      } // 搜尋功能
      setCityActivities(_cityActivities);
    }); // 接活動資料

    getCityScenicSpots(selectedCity).then((data) => {
      const _totalScenicSpots = data.filter(
        (item) =>
          item.Picture.hasOwnProperty("PictureUrl1") &&
          item.hasOwnProperty("City")
      );
      setTotalScenicSpots(_totalScenicSpots);
      let _cityScenicSpots = [];
      if (data.length !== 0 && !qureyParams.keyword) {
        _cityScenicSpots = _totalScenicSpots.slice(
          (scenicSpotsPage - 1) * 20,
          scenicSpotsPage * 20
        );
      } // 篩選城市
      if (data.length !== 0 && qureyParams.keyword) {
        _cityScenicSpots = _totalScenicSpots
          .filter((_totalScenicSpot) =>
            _totalScenicSpot.ScenicSpotName.includes(qureyParams.keyword)
          )
          .slice((scenicSpotsPage - 1) * 20, scenicSpotsPage * 20);
      } // 搜尋功能
      setCityScenicSpots(_cityScenicSpots);
    }); // 接景點資料

    setTimeout(() => {
      setIsFirstCardsLoading(false);
      setIsSecondCardsLoading(false);
    }, 1 * 1000);
  }, [qureyParams]);

  useEffect(() => {
    pushSearchParam([{ key: "scenicSpotsPage", value: scenicSpotsPage }]);
    if (selectedCity === null) return;
    const _activities = totalActivities?.slice(
      (scenicSpotsPage - 1) * 20,
      scenicSpotsPage * 20
    );
    setCityActivities(_activities);
    const _cityScenicSpots = totalScenicSpots?.slice(
      (scenicSpotsPage - 1) * 20,
      scenicSpotsPage * 20
    );
    setCityScenicSpots(_cityScenicSpots);
  }, [scenicSpotsPage]);

  useEffect(() => {
    pushSearchParam([{ key: "activitiesPage", value: activitiesPage }]);
    if (selectedCity === null) return;
    const _activities = totalActivities?.slice(
      (activitiesPage - 1) * 20,
      activitiesPage * 20
    );
    setCityActivities(_activities);
  }, [activitiesPage]);

  return <FilterItems {...FilterItemsProps} />;
};

export default withRouter(ScenicSpots);
