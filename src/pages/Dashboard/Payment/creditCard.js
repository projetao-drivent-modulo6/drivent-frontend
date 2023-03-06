import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
  
const Teste = styled.div`
      display: flex;
      align-items: center;
      width: 70%;
  
`;
  
const CardForm = styled.form`
      display: flex;
      flex-direction: column;
      margin-left: 50px;
      gap: 10px;
      p{
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
          ::placeholder{
            color: #8E8E8E;
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
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }
  
  render() {
    return (
      <Teste id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <CardForm>
        	<input
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <p>Ex: 49....., 51......, 36.......</p>
          <input
            type="name"
            name="name"
            placeholder="Name"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <div id='MinorInputs'>
            <input
              type="tel"
              name="expiry"
              placeholder="Valid Thru"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <input
              id='minor2'
              type="tel"
              name="cvc"
              placeholder="CVC"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
        </CardForm>
      </Teste>
      
    );
  }
}
