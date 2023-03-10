import { useState } from 'react';
import styled from 'styled-components';
import useSaveBooking from '../../hooks/api/useSaveBooking';
import { Room } from './Room';

export function RoomSelection({ rooms, setRooms, updateBookings }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { saveBooking } = useSaveBooking();

  function handleOptionChange(e) {
    setSelectedRoom(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await saveBooking(selectedRoom);
    updateBookings();
    setRooms(null);
  }

  return (
    <RoomSelectionStyle>
      <h5>Ótima pedida! Agora escolha seu quarto:</h5>
      <form id='rooms' onSubmit={handleSubmit}>
        {rooms.map(e => <Room key={e.id} data={e} selectedRoom={selectedRoom} handleOptionChange={handleOptionChange}/>)}
      </form>
      {selectedRoom && <ButtonSelection form='rooms'>RESERVAR QUARTO</ButtonSelection>}
    </RoomSelectionStyle>
  );
}

const RoomSelectionStyle = styled.div`
  h5 {
    font-family: 'Roboto';
    font-size: 20px;
    color: #8E8E8E;
    margin-bottom: 33px;
  }

  #rooms {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 17px;
    margin-bottom: 46px;
  }
`;

export const ButtonSelection = styled.button`
  cursor: pointer;
  width: 182px;
  height: 37px;

  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;

  font-family: 'Roboto';
  font-size: 14px;
`;
