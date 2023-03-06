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

export default function PaymentCardScreen() {
  const [payment, setPayment] = useState(false);

  return(
    <Payment>
      <div></div>
      <h1>Pagamento</h1>
      { payment !== true ? <PaymentForm></PaymentForm> : <div></div>}
    </Payment>
    
  );
}
