import styled from "styled-components";
import { buttonsLigthBlue } from "../Constants/Colors";
import { Link } from "react-router-dom";
import { AuthContext } from "../AppContext/auth";
import { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Footer() {
  const { percentageDone } = useContext(AuthContext);

  return (
    <FooterSyle data-test="menu">
      <Link to="/habitos" data-test="habit-link">Pensamentos</Link>
      <Link to="/hoje">
        <TodayStyle  data-test="today">
          <CircularProgressbar
            value={percentageDone}
            text={"Hoje"}
            styles={buildStyles({ textColor: "#ffffff", pathColor:"white", trailColor:buttonsLigthBlue})}
          />
        </TodayStyle>
      </Link>
      <Link to="/historico"  data-test="history-link">Histórico</Link>
    </FooterSyle>
  );
}

const FooterSyle = styled.div`
  position: fixed;
  left: 0px;
  bottom: 0px;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  box-sizing: border-box;
  z-index: 1;
  background-color: white;
  a {
    color: ${buttonsLigthBlue};
    text-decoration: none;
    font-size: 18px;
  }
`;
const TodayStyle = styled.div`
  box-sizing: border-box;
  width: 91px;
  height: 91px;
  background-color: ${buttonsLigthBlue};
  padding: 5px;
  margin-bottom: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
`;
