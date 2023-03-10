import PaymentForm from './creditCard';
import styled from 'styled-components';
import { useState } from 'react';
import useTicketTypes from '../../../hooks/api/useTicketTypes';

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  h1 {
    margin-left: 5px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
  }
  #oi {
    width: 10px;
    height: 10px;
    background-color: black;
  }
`;

const PriceBox = styled.div`
  width: 290px;
  height: 108px;
  background: #ffeed2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #454545;
  }
  h2 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #898989;
  }
`;

export default function PaymentCardScreen({ selectedOptions, setProv }) {
  // TODO implementar o resumo do pedido a partir do objeto {selectedOptions}
  const [payment, setPayment] = useState(false);
  const { ticketTypes } = useTicketTypes();

  return (
    <Payment>
      <PriceBox>
        <h1>
          {selectedOptions?.firstOption.title} + {selectedOptions?.secondOption.title}
        </h1>
        <h2>R$ {selectedOptions?.firstOption.price + selectedOptions.secondOption.price}</h2>
      </PriceBox>
      <h1>Pagamento</h1>
      {payment !== true ? <PaymentForm setProv={setProv} ></PaymentForm> : <div></div>}
    </Payment>
  );
}
