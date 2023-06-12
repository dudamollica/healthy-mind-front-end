import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { backgroundGray, darkBlue, ligthGreen } from "../Constants/Colors";
import Check from "../Assets/check.png";
import { AuthContext } from "../AppContext/auth";

export default function Today() {
  const [todaysHabits, setTodayHabits] = useState([]);
  const [concludesHabits, setConcludesHabits] = useState([]);
  const { token, calcPercentageDone } = useContext(AuthContext);

  useEffect(() => {
    const URL =
    process.env.REACT_APP_API_URL;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.get(URL, config);
    promise.then((res) => {
      setTodayHabits(res.data);
      const alredyConclude = res.data.filter((h) => h.done).map((h) => h.id);
      setConcludesHabits(alredyConclude);
    });
    promise.catch((err) => console.log(err.data));
  }, []);

  function noCompletedHabit() {
    calcPercentageDone(concludesHabits, todaysHabits);
    return <p data-test="today-counter"> Nada para ser exibido ainda </p>;
  }

  function check(id, done) {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const body = "";
    if (!done) {
      const promisePost = axios.post(
        process.env.REACT_APP_API_URL,
        body,
        config
      );
      promisePost.then((res) => {
        const URL =
        process.env.REACT_APP_API_URL;
        const promise = axios.get(URL, config);
        promise.then((res) => setTodayHabits(res.data));
        const newConcludes = [...concludesHabits, id];
        setConcludesHabits(newConcludes);
      });
    } else {
      const promisePost = axios.post(
        process.env.REACT_APP_API_URL,
        body,
        config
      );
      promisePost.then((res) => {
        const URL =
        process.env.REACT_APP_API_URL;
        const promise = axios.get(URL, config);
        promise.then((res) => setTodayHabits(res.data));
        const newConcludes = concludesHabits.filter((h) => h != id);
        setConcludesHabits(newConcludes);
      });
    }
  }

  return (
    <>
      <Header />
      <TodayContainer>
        <DayStyle concludesHabits={concludesHabits.length}>
         
          <br />
          {concludesHabits.length == 0 ? (
            noCompletedHabit()
          ) : (
            <p data-test="today-counter">
              {calcPercentageDone(concludesHabits, todaysHabits)}% dos hábitos
              concluídos
            </p>
          )}
        </DayStyle>
        {todaysHabits.length != 0 &&
          todaysHabits.map((h, index) => (
            <TodayHabits
              done={h.done}
              key={index}
              data-test="today-habit-container"
            >
              <div>
                <h1 data-test="today-habit-name">{h.name}</h1>
                <span>
                  <span data-test="today-habit-sequence">
                    Sequência atual:
                    <CurrentSequence done={h.done ? true : false}>
                      {h.currentSequence} dias
                    </CurrentSequence>
                  </span>
                  <br />
                  <span data-test="today-habit-record">
                    Seu recorde:
                    <HighestSequence
                      cs={h.currentSequence}
                      hs={h.highestSequence}
                    >
                      {h.highestSequence} dias
                    </HighestSequence>
                  </span>
                </span>
              </div>
              <CheckBox
                onClick={() => check(h.id, h.done)}
                done={h.done ? true : false}
                data-test="today-habit-check-btn"
              >
                <img src={Check} />
              </CheckBox>
            </TodayHabits>
          ))}
      </TodayContainer>
      <Footer />
    </>
  );
}

const HighestSequence = styled.strong`
  color: ${(props) => props.cs == props.hs && props.cs > 0 && ligthGreen};
  margin-left: 3px;
`;

const CurrentSequence = styled.strong`
  color: ${(props) => props.done && ligthGreen};
  margin-left: 3px;
`;

const CheckBox = styled.button`
  width: 69px;
  height: 69px;
  background: ${(props) => (props.done ? ligthGreen : "#EBEBEB")};
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  color: white;
  font-size: 30px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodayHabits = styled.div`
  width: 90%;
  height: 94px;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  padding: 15px 10px;
  box-sizing: border-box;
  justify-content: space-between;
  h1 {
    font-size: 20px;
    color: #666666;
  }
  span {
    color: #666666;
    font-size: 13px;
    line-height: 16px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

const DayStyle = styled.div`
  font-size: 23px;
  color: ${darkBlue};
  margin-bottom: 40px;
  p {
    color: ${(props) => (props.concludesHabits ? ligthGreen : "#bababa")};
    font-size: 18px;
    margin-top: 5px;
  }
`;

const TodayContainer = styled.div`
  background-color: ${backgroundGray};
  padding-left: 15px;
  box-sizing: border-box;
  padding-top: 90px;
  padding-bottom: 100px;
`;
