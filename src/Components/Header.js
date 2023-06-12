import styled from "styled-components";
import { darkBlue } from "../Constants/Colors";
import TrackIt from "../Assets/mind.png";
import { AuthContext } from "../AppContext/auth";
import { useContext } from "react";
import dayjs from "dayjs";

export default function Header() {
  const { userImg } = useContext(AuthContext);
  function wichDay() {
    switch (dayjs().day()) {
      case 0:
        return "Domingo";
      case 1:
        return "Segunda";
      case 2:
        return "Terça";
      case 3:
        return "Quarta";
      case 4:
        return "Quinta";
      case 5:
        return "Sexta";
      case 6:
        return "Sábado";
      default:
        break;
    }
  }


  return (
    <HeaderStyle data-test="header">
      <div>
        <img src={TrackIt} alt="Logo TrackIt" />
      </div>
      <span data-test="today">
        {wichDay()}, {dayjs().date()}/{dayjs().month() + 1}
      </span>
      <UserImg src={userImg} />
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  position: fixed;
  z-index: 1;
  height: 100px;
  width: 100%;
  background-color: ${darkBlue};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
  div {
    background-color: ${darkBlue};
  }
  img {
    background-color: ${darkBlue};
    height:90px;
  }
`;
const UserImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 98.5px;
`;
