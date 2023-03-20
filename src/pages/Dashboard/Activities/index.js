import { Stages } from '../../../components/Activities/Stages';
import useStages from '../../../hooks/api/useStages';
import styled from 'styled-components';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import useToken from '../../../hooks/useToken';

const PaymentRequired = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  h1 {
    width: 411px;
    height: 46px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #8e8e8e;
  }
  h2 {
    width: 462px;
    height: 46px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #8e8e8e;
  }
`;

const DateButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 131px;
  height: 37px;
  background: ${props => props.index === props.selectButton ? '#FFD37D' : '#E0E0E0'};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-bottom: 71px;
  cursor: pointer;
`;

const AllDates = styled.div`
  display: flex;
  gap: 20px;
`;

const DatePage = styled.div`
  font-family: 'Roboto';
  h1 {
    width: 329px;
    height: 40px;
    font-size: 34px;
    line-height: 40px;
    color: #000000;
    margin-bottom: 36px;
  }
  h2 {
    width: 296px;
    height: 23px;
    font-size: 20px;
    line-height: 23px;
    color: #8E8E8E;
    margin-bottom: 23px;
  }
`;

export default function Activities() {
  const { stages, updateStages } = useStages();
  const [ticketStatus, setTicketStatus] = useState({});
  const [isLoadingTicket, setIsLoadingTicket] = useState(true);
  const [dates, setDates] = useState();
  const [selectDate, setSelectDate] = useState();
  const [selectButton, setSelectButton] = useState();
  const token = useToken();

  async function getTicket() {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}tickets/`, config);
      setTicketStatus(response.data);
      setIsLoadingTicket(false);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }

  async function getDates() {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}activities/dates`, config);
      setDates(response.data);
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
    }
  }

  function handleClick(date, index) {
    setSelectButton(index);
    setSelectDate(new Date(date).getTime());
  };

  useEffect(() => {
    getTicket();
    getDates();
  }, []);

  if (isLoadingTicket) {
    return (
      <PaymentRequired>
        <h1>Verificando pagamento...</h1>
      </PaymentRequired>
    );
  }

  if (ticketStatus.status !== 'PAID') {
    return (
      <PaymentRequired>
        <h1>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</h1>
      </PaymentRequired>
    );
  }

  if (ticketStatus.TicketType.isRemote !== false) {
    return (
      <PaymentRequired>
        <h2>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</h2>
      </PaymentRequired>
    );
  }

  return (
    <DatePage>
      <h1>Escolha de atividades</h1>
      {!selectDate && <h2>Primeiro, filtre pelo dia do evento: </h2>}
      <AllDates>{dates && dates.map((d, index) => {
        const date = new Date(d.date);
        const formatDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate() + 1}`;
        const weekday = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        return (<DateButton index={index} selectButton={selectButton} onClick={() => handleClick(formatDate, index)}>{`${weekday[date.getDay()]}, ${date.getDate()}/${date.getMonth()}`}</DateButton>);
      })}</AllDates>
      {selectDate && <Stages stages={stages} date={selectDate} updateStages={updateStages} />}
    </DatePage>
  );
}
