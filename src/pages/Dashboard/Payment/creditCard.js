import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
import { ConfirmButton } from '../../../components/Dashboard/payment/ConfirmButton';
import axios from 'axios';
import InputMask from 'react-input-mask';

const Teste = styled.div`
  display: flex;
  width: 70%;
`;

const CardForm = styled.form`
  display: flex;
  width: 100vw;
  flex-direction: column;
  #cardInput {
    display: flex;
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

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name.length });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { cvc, expiry, focus, name, number } = this.state;
    const formData = { cvc, expiry, focus, name, number };
    const API = process.env.REACT_APP_API_BASE_URL + 'payments/process';
    axios
      .post(API, formData, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI2MywiaWF0IjoxNjc4MTA4MzU3fQ.tzU-uIGoajPSYsMF4qgjyyd9Ug9vPBeXuo6kWRhuuHU',
        },
      })
      .then((response) => response.json()) // eslint-disable-next-line
      .then((data) => console.log(data)) // eslint-disable-next-line
      .catch((error) => console.error(error));
  };

  render() {
    const { setProv } = this.props;
    function changeScreenState() {
      setProv(3);
    }
    return (
      <Display>
        <Teste id="PaymentForm">
          <CardForm onSubmit={this.handleSubmit}>
            <div id="cardInput">
              <Cards
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focus}
                name={this.state.name}
                number={this.state.number}
              />
              <div id="inputs">
                <InputMask
                  mask="9999 9999 9999 9999"
                  name="number"
                  placeholder="Card Number"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  maskChar=""
                />
                <p>Ex: 49....., 51......, 36......., 41.......</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  maxLength="16"
                  pattern="^[A-Za-z]+$"
                />
                <div id="MinorInputs">
                  <input
                    type="tel"
                    name="expiry"
                    placeholder="Valid Thru"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    maxLength="4"
                    inputMode="numeric"
                  />
                  <input
                    id="minor2"
                    type="tel"
                    name="cvc"
                    placeholder="CVC"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    maxLength="3"
                  />
                </div>
              </div>
            </div>
            <ConfirmButton onClick={changeScreenState} id="button" confirmBox="FINALIZAR PAGAMENTO"></ConfirmButton>
          </CardForm>
        </Teste>
      </Display>
    );
  }
}
