import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import HotelSquare from './HotelSquare';

export default function ChooseHotel({ showRoomSelection, hideRoomSelection }) {
  const [selectedHotelIndex, setSelectedHotelIndex] = useState(null);
  const [hotels, setHotels] = useState([]);
  const token = useToken();

  useEffect(async() => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const requisicao = await axios.get('http://localhost:4000/hotels', config);

      const { data: hotels } = requisicao;
      hotels.forEach((hotel) => {
        let sum = 0;
        const arr = [];
        const hash = {};
        for (let i = 0; i < hotel.Rooms.length; i++) {
          const e = hotel.Rooms[i];
          if (e.capacity !== e._count.Booking) sum += e.capacity - e._count.Booking;
          switch (e.capacity) {
          case 1:
            if (!hash[1]) hash[1] = true;
            break;
          case 2:
            if (!hash[2]) hash[2] = true;
            break;
          case 3:
            if (!hash[3]) hash[3] = true;
            break;
          default: break;
          }
        }
        if (hash[1]) arr.push('Single');
        if (hash[2]) arr.push('Double');
        if (hash[3]) arr.push('Triple');

        let types;
        if (arr.length === 1) types = arr.join('');
        if (arr.length === 2) types = arr.join(' e ');
        if (arr.length === 3) {
          arr.splice(1, 0, ', ');
          arr.splice(3, 0, ' e ');
          types = arr.join('');
        }
        hotel.roomCount = sum;
        hotel.types = types;
      });

      setHotels(hotels);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }, []);

  const handleHotelSquareClick = (id, index) => {
    if (selectedHotelIndex === index) {
      setSelectedHotelIndex(null);
      hideRoomSelection();
    } else {
      setSelectedHotelIndex(index);
      showRoomSelection(id);
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
            hotel={hotel}
            selected={selectedHotelIndex === index}
            onClick={() => handleHotelSquareClick(hotel.id, index)}
          />
        ))}
      </HotelContainer>
    </>
  );
}

// Styled components

export const ChooseHotelPhrase = styled.div`
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
    margin-bottom: 14px;
  }
`;

const HotelContainer = styled.div`
  display: flex;
  /* justify-content: space-around;
  align-items: center; */
  margin-bottom: 52px;
`;
