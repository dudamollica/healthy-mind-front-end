import styled from "styled-components";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { backgroundGray, darkBlue } from "../Constants/Colors";

export default function Historic() {
  return (
    <>
      <Header />
      <HistoricContainer>
        <h1>Histórico</h1>
        <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
      </HistoricContainer>
      <Footer />
    </>
  );
}

const HistoricContainer = styled.div`
  background-color: ${backgroundGray};
  height: 527px;
  padding: 100px 15px;
  h1 {
    font-size: 23px;
    color: ${darkBlue};
    margin-bottom: 20px;
  }
  p{
    color: #666666;
    font-size: 18px;
  }
`;
