import React from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { __FFF__, __FF1D6C__, __FFB72C__, __D2D2D2__ } from "variable/variable";
import { ReactComponent as WelcomeToTaiwan } from "assets/welcomeToTaiwan.svg";
import { ReactComponent as Search } from "assets/search.svg";
import { ReactComponent as Gps } from "assets/gps.svg";
import Paper from "components/Paper";
import Input from "components/Input";
import SquareButton from "components/SquareButton";
import Dropdown from "components/Dropdown";
import landing from "assets/landing.png";

const Tool = (props) => {
  const {
    history,
    style,
    className,
    categories,
    counties,
    selectedCategories,
    setSelectedCategories,
    selectedCity,
    setSelectedCity,
    onCatgoreyChange = () => {},
    onCountiesChange = () => {},
    onClickSearchButton = () => {},
    keyword = "",
    setKeyword = () => {},
  } = props;

  return (
    <Box style={style} className={className}>
      <LandingImgBox
        id="Tool-LandingImgBox"
        widthOfShadowLength={"80%"}
        rotateOfShadow={2}
      >
        <LandingImg>
          <Grid>
            <Content>
              <TitleBox>
                <Title id="Tool-Title">
                  <Welcome width={"100%"} height={"100%"} />
                  <Remark>台北、台中、台南、屏東、宜蘭……遊遍台灣</Remark>
                </Title>
              </TitleBox>
              <SearchBox>
                <SearchBar
                  placeholder="搜尋關鍵字"
                  value={keyword}
                  setValue={setKeyword}
                />
              </SearchBox>
              <DropdownBox>
                <CatgoreyDropdown
                  selected={selectedCategories}
                  setSelected={setSelectedCategories}
                  options={categories}
                  onChange={(e) => {
                    onCatgoreyChange(e);
                  }}
                />
                <CountiesDropdown
                  options={counties}
                  selected={selectedCity}
                  setSelected={setSelectedCity}
                  onChange={(e) => {
                    onCountiesChange(e);
                  }}
                />
                <SearchButton onClick={onClickSearchButton}>
                  <SearchIcon width={"16px"} />
                </SearchButton>
              </DropdownBox>
            </Content>
          </Grid>
        </LandingImg>
      </LandingImgBox>
    </Box>
  );
};

const Welcome = styled(WelcomeToTaiwan)``;

const Content = styled.div`
  grid-column-start: 5;
  grid-column-end: 9;
  padding: 0px 50px;

  @media (max-width: 1600px) {
    padding: 0px 0px;
  }

  @media (max-width: 1440px) {
    grid-column-start: 5;
    grid-column-end: 9;
  }

  @media (max-width: 1200px) {
    grid-column-start: 4;
    grid-column-end: 10;
    padding: 0px 50px;
  }

  @media (max-width: 1024px) {
    padding: 0px 0px;
  }

  @media (max-width: 768px) {
    grid-column-start: 3;
    grid-column-end: 11;
    padding: 0px 20px;
  }

  @media (max-width: 576px) {
    grid-column-start: 1;
    grid-column-end: 13;
  }
`;

const Grid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(12, 1fr);
  height: 100%;
`;

const LandingImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${landing});
  background-size: cover;
  background-position: center center;
`;

const LandingImgBox = styled(Paper)`
  aspect-ratio: 32 / 9;
  width: 100%;
  height: auto;
  padding: 23px 27px;
  margin-bottom: 90px;

  @media (max-width: 576px) {
    aspect-ratio: 2 / 1;
  }
`;

const Box = styled.section``;

const GpsIcon = styled(Gps)`
  & > path {
    fill: ${__FFF__()};
    stroke: ${__FFF__()};
  }
`;

const GpshButton = styled(SquareButton)`
  background-color: ${__FFB72C__()};
`;

const CountiesDropdown = styled(Dropdown)`
  flex: 1;
  margin-right: 7px;
`;

const CatgoreyDropdown = styled(Dropdown)`
  flex: 1;
  margin-right: 7px;
`;

const DropdownBox = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(Search)`
  & > path {
    fill: ${__FFF__()};
    stroke: ${__FFF__()};
  }
`;

const SearchButton = styled(SquareButton)`
  background-color: ${__FF1D6C__()};
`;

const SearchBar = styled(Input)`
  width: 100%;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Remark = styled.p`
  color: ${__FFF__()};
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
`;

const TitleBox = styled.div``;

const Title = styled.div`
  margin-bottom: 16px;
`;

export default withRouter(Tool);
