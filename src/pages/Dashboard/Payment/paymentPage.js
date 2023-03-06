import PaymentForm from './creditCard';
import styled from 'styled-components';
import { useState } from 'react';

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
        color: #8E8E8E;
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
  background: #FFEED2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  h1{
    width: 167px;
    height: 19px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #454545
  }
  h2{
    width: 44px;
    height: 16px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #898989;
  }
`;

export default function PaymentCardScreen() {
  const [payment, setPayment] = useState(false);

  return(
    <Payment>
      <PriceBox>
        <h1>Presencial + Com Hotel</h1>
        <h2>R$ 600</h2>
      </PriceBox>
      <h1>Pagamento</h1>
      { payment !== true ? <PaymentForm></PaymentForm> : <div></div>}
    </Payment>
    
  );
}
