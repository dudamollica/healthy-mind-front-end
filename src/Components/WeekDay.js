import styled from "styled-components";

export default function WeekDay({
  loading,
  id,
  name,
  daysChoose,
  setDaysChoose,
}) {
  const dayChoose = daysChoose.includes(id);

  function chooseThisDay(e, id) {
    e.preventDefault();
    if (!dayChoose) {
      const daysList = [...daysChoose, id];
      setDaysChoose(daysList);
    } else {
      const daysList = daysChoose.filter((d) => d != id);
      setDaysChoose(daysList);
    }
  }

  return (
    <ButtonStyle
      disabled={loading ? true : false}
      onClick={(e) => chooseThisDay(e, id)}
      dayChoose={dayChoose && true}
      data-test="habit-day"
    >
      {name}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button`
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  color: ${(props) => (props.dayChoose ? "white" : "#DBDBDB")};
  background-color: ${(props) => (props.dayChoose ? "#DBDBDB" : "white")};
`;
