import styled from 'styled-components';

export default function HotelSquare({ hotel, selected, onClick }) {
  return (
    <HotelSquareStyle selected={selected} onClick={onClick}>
      <img src={hotel.image} alt={hotel.name}></img>
      <h1>{hotel.name}</h1>
      <h2>Tipos de acomodação:</h2>
      <p>{hotel.types}</p>
      <h2>Vagas disponíveis:</h2>
      <p>{hotel.roomCount}</p>
    </HotelSquareStyle>
  );
}

export const HotelSquareStyle = styled.div`
  height: 264px;
  width: 196px;
  background-color: ${({ selected }) => (selected ? '#FFEED2' : '#ebebeb')};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 14px;
  margin-right:20px;
  
  img {
    width: 168px;
    height: 109px;
    background-color: gainsboro;
    border-radius: 5px;
    margin-bottom: 14px;
  }

  h1 {
    color: #343434;
    font-size: 20px;
  }

  h2 {
    font-size: 12px;
    color: #3c3c3c;
    font-weight: 700;
    margin-top: 14px;
    margin-bottom: 2px;
  }

  p {
    font-size: 12px;
    color: #3c3c3c;
    font-weight: 400;
    margin-top: 2px;
  }
`;
