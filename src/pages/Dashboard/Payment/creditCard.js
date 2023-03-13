import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
import { ConfirmButton } from '../../../components/Dashboard/payment/ConfirmButton';
import axios from 'axios';
import InputMask from 'react-input-mask';
import useToken from '../../../hooks/useToken';

const Teste = styled.div`
  display: flex;
  width: 70%;
`;

const CardForm = styled.form`
  display: flex;
  width: 100vw;
  
  
  #cardInput {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
  }
  #inputs {
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    gap: 10px;
    p {
      font-size: 12px;
      color: grey;
    }
    input {
      box-sizing: border-box;
      border-radius: 5px;
      border: 1.5px solid grey;
      height: 40px;
      width: 350px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 300;
      font-size: 20px;
      line-height: 23px;
      color: black;
      padding: 10px;
      ::placeholder {
        color: #8e8e8e;
      }
    }
    #MinorInputs {
      display: flex;
      gap: 20px;
      input {
        width: 200px;
      }
      #minor2 {
        width: 130px;
      }
    }
  }
`;

const Display = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function PaymentForm({ setProv, userTicketId }) {
  const token = useToken();

  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputFocus = (e) => {
    setFocus(e.target.name.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
    case 'number':
      setNumber(value);
      break;
    case 'name':
      setName(value);
      break;
    case 'expiry':
      setExpiry(value);
      break;
    case 'cvc':
      setCvc(value);
      break;
    default:
      break;
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const cardData = { issuer: 'generic', name, number, cvv: cvc, expirationDate: expiry };
    //TODO implements the issuer get function, replacing the 'generic' value
    const reqBody = { ticketId: userTicketId, cardData: cardData };
    const API = 'http://localhost:4000/payments/process';
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios
      .post(API, reqBody, config)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));

    setProv(3);
  };

  const changeScreenState = () => {
    if(cvc !== '') {
      setProv(3);
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  };

  return (
    <Display>
      <Teste id="PaymentForm">
        <CardForm onSubmit={handleSubmit}>
          <div id="cardInput">
            <Cards cvc={cvc} expiry={expiry} focused={focus} name={name} number={number} />
            <ConfirmButton confirmBox="FINALIZAR PAGAMENTO" type="submit"></ConfirmButton>
          </div>
          <div id="inputs">
            <InputMask
              mask="9999 9999 9999 9999"
              maskChar=" "
              name="number"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="Número do cartão"
              value={number}
            />
            <p>Ex: 49....., 51......, 36......., 41.......</p>
            <InputMask
              mask="99/99"
              maskChar=" "
              name="expiry"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="MM/AA"
              value={expiry}
            />
            <InputMask
              mask="999"
              maskChar=" "
              name="cvc"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="CVC"
              value={cvc}
            />
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="Nome (como escrito no cartão)"
              value={name}
              maxLength='16'
            />
          </div>
        </CardForm>
      </Teste>
    </Display>
  );
}
