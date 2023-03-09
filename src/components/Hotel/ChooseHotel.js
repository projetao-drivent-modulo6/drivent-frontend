import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';

export default function ChooseHotel({ showRoomSelection, hideRoomSelection }) {
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
        console.log(hotels);
      } catch (error) {
        console.log(error);
      }
    }
    teste();
  }, []);

  const handleHotelSquareClick = (id, index) => {
    if (selectedHotelIndex === index) {
      setSelectedHotelIndex(null);
      hideRoomSelection();
    } else {
      setSelectedHotelIndex(index);
      console.log(id);
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
            selected={selectedHotelIndex === index}
            onClick={() => handleHotelSquareClick(hotel.id, index)}
            
          >
            <img src={hotel.image} alt={hotel.name}></img>
            <h1>{hotel.name}</h1>
            <h2>Tipos de acomodação:</h2>
            <p>{hotel.types}</p>
            <h2>Vagas disponíveis:</h2>
            <p>{hotel.roomCount}</p>
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
  margin-left: 10px;

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
  /* justify-content: space-around;
  align-items: center; */
  margin-bottom: 52px;
`;
