import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';

export default function ChooseHotel() {
  const [selectedHotelIndex, setSelectedHotelIndex] = useState(null);
  const [hotels, setHotels] = useState([]);
  const token = useToken();

  useEffect(() => {
    async function teste() {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const requisicao = await axios.get('http://localhost:4000/hotels', config);
        console.log(requisicao);
        setHotels(requisicao.data);
      } catch (error) {
        console.log(error);
      }
    }
    teste();
  });

  const handleHotelSquareClick = (index) => {
    if (selectedHotelIndex === index) {
      setSelectedHotelIndex(null);
    } else {
      setSelectedHotelIndex(index);
    }
  };

  return (
    <>
      <ChooseHotelPhrase>
        <h1>Escolha de hotel e quarto</h1>
        <p> Primeiro, escolha seu hotel</p>
      </ChooseHotelPhrase>

      <HotelContainer>
        {hotels.map((hotel, index) => (
          <HotelSquare
            key={hotel.id}
            selected={selectedHotelIndex === index}
            onClick={() => handleHotelSquareClick(index)}
          >
            <img src={hotel.image} alt={hotel.name}></img>
            <h1>{hotel.name}</h1>
            <h2>Tipos de acomodação:</h2>
            <p>Single and Double</p>
            <h2>Vagas disponíveis:</h2>
            <p>103</p>
          </HotelSquare>
        ))}
      </HotelContainer>
    </>
  );
}

// Styled components

const ChooseHotelPhrase = styled.div`
  h1 {
    color: black;
    font-size: 34px;
    font-weight: 400;
    margin-top: 5px;
  }

  p {
    font-size: 20px;
    font-weight: 400;
    color: #8e8e8e;
    margin-top: 43px;
    margin-bottom: 28px;
  }
`;

const HotelSquare = styled.div`
  height: 264px;
  width: 196px;
  background-color: ${({ selected }) => (selected ? '#FFEED2' : '#ebebeb')};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    color: #343434;
    font-size: 20px;
    margin-top: 10px;
    margin-left: 15px;
  }

  img {
    width: 168px;
    height: 109px;
    background-color: gainsboro;
    border-radius: 5px;
    margin-left: 14px;
  }

  h2 {
    font-size: 12px;
    color: #3c3c3c;
    font-weight: 700;
    margin-left: 15px;
    margin-top: 10px;
  }

  p {
    font-size: 12px;
    color: #3c3c3c;
    font-weight: 400;
    margin-left: 15px;
    margin-top: 2px;
  }
`;

const HotelContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
