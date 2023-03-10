import styled from 'styled-components';
import useRemoveBooking from '../../hooks/api/useRemoveBooking';
import { ChooseHotelPhrase } from './ChooseHotel';
import { HotelSquareStyle } from './HotelSquare';
import { ButtonSelection } from './RoomSelection';

export default function HotelFinal({ booking, showRoomSelection }) {
  const { removeBooking } = useRemoveBooking();
  const { Room: room, Room: { Hotel: hotel } } = booking;
  room.type = (room.capacity === 1) ? 'Single' : (room.capacity === 2) ? 'Double' : 'Triple';
  const plus = room._count.Booking - 1;

  async function handleClickExchangeRoom() {
    await removeBooking(booking.id);
    showRoomSelection(hotel.id);
  }

  return (
    <>
      <ChooseHotelPhrase>
        <h1>Escolha de hotel e quarto</h1>
        <p>Você já escolheu seu quarto:</p>
      </ChooseHotelPhrase>

      <HotelSquareStyleAlt selected={true}>
        <img src={hotel.image} alt={hotel.name}></img>
        <h1>{hotel.name}</h1>
        <h2>Quarto reservado</h2>
        <p>{`${room.name} (${room.type})`}</p>
        <h2>Pessoas no seu quarto</h2>
        <p>{'Você' + (plus && ' e mais ' + plus)}</p>
      </HotelSquareStyleAlt>

      <ButtonSelection onClick={handleClickExchangeRoom}>TROCAR DE QUARTO</ButtonSelection>
    </>
  );
}

const HotelSquareStyleAlt = styled(HotelSquareStyle)`
  margin-bottom: 49px;
`;
