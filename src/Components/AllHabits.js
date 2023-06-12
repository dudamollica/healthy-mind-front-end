import axios from "axios";
import styled from "styled-components";

export default function AllHabits({
  habitsList,
  setHabitsList,
  token,
  id,
  weekDay,
  name,
  days,
}) {
  function deleteHabit(id, name, days) {
    const wantToDelete = window.confirm(
      "Você tem certeza que deseja excluir este hábito?"
    );
    const body = { id, name, days };
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    if (wantToDelete) {
      axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
        config
      );
      const newHabitsList = habitsList.filter((h) => h.id != id);
      setHabitsList(newHabitsList);
    }
  }

  return (
    <>
      <HabitStyle data-test="habit-container">
        <ion-icon
          onClick={() => deleteHabit(id, name, days)}
          data-test="habit-delete-btn"
          name="trash-outline"
        ></ion-icon>
        <span data-test="habit-name">{name}</span>
        <div>
          {weekDay.map((d, index) => (
            <WeekDayStyle
              disabled
              key={index}
              id={index}
              days={days}
              data-test="habit-day"
            >
              {d}
            </WeekDayStyle>
          ))}
        </div>
      </HabitStyle>
    </>
  );
}

const HabitStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 91px;
  background: #ffffff;
  border-radius: 5px;
  margin-bottom: 10px;
  justify-content: space-around;
  padding-left: 20px;
  box-sizing: border-box;
  margin-left: 20px;
  span {
    color: #666666;
    font-size: 20px;
  }
  div {
    display: flex;
    gap: 5px;
  }
  ion-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #666666;
    font-size: 20px;
  }
`;
const WeekDayStyle = styled.button`
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  font-size: 20px;
  color: ${(props) => (props.days.includes(props.id) ? "white" : "#DBDBDB")};
  background-color: ${(props) =>
    props.days.includes(props.id) ? "#DBDBDB" : "white"};
`;
