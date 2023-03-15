import { useEffect, useState } from 'react';
import useBooking from '../../../hooks/api/useBooking';
import useHotelWithRoom from '../../../hooks/api/useHotelWithRoom';
import { RoomSelection } from '../../../components/Hotel/RoomSelection';
import ChooseHotel from '../../../components/Hotel/ChooseHotel';
import HotelFinal from '../../../components/Hotel/HotelFinal';
import useToken from '../../../hooks/useToken';
import axios from 'axios';
import styled from 'styled-components';

const NullScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  h1{
    font-size: 1.2rem;
    font-weight: 800;
  }
`;

export default function Hotel() {
  const [rooms, setRooms] = useState(null);
  const [hotelBooking, setHotelBooking] = useState(null);
  const { booking, bookingLoading, getBookings } = useBooking();
  const { hotelWithRoom, getHotelWithRoom } = useHotelWithRoom();
  const [ticketStatus, setTicketStatus] = useState(null);
  const showRoomSelection = (id) => getHotelWithRoom(id);
  const hideRoomSelection = () => setRooms(null);
  const token = useToken();

  useEffect(async() => {
    async function getTicketFromUser() {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const ticketId = await axios.get(`${process.env.REACT_APP_API_BASE_URL}tickets/`, config);
        return ticketId;
      } catch (error) { // eslint-disable-next-line
        console.log(error);
      }
    }
    const userTicket = await getTicketFromUser();
    if (!userTicket) {
      setTicketStatus(null);
    } else if (userTicket.data.status !== 'PAID') {
      setTicketStatus('NOT PAID');
    } else if (!userTicket.data.TicketType.includesHotel) {
      setTicketStatus('HOTEL NOT INCLUDED');
    } else {
      setTicketStatus('GOOD');
    }

    setRooms(hotelWithRoom?.Rooms);
    if (booking) {
      setHotelBooking(booking);
    }
  }, [hotelWithRoom, booking]);

  async function updateBookings() {
    try {
      await getBookings();
    } catch (error) {
      setHotelBooking(null);
    }
  }

  if (bookingLoading) return <></>;
  if (ticketStatus == null) {
    return <NullScreen><h1> Ingresso não encontrado, por favor compre um ingresso antes de acessar esta página.</h1></NullScreen>;
  }

  if (ticketStatus === 'NOT PAID') {
    return <NullScreen><h1>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h1></NullScreen>;
  }

  if (ticketStatus === 'HOTEL NOT INCLUDED') {
    return <NullScreen><h1>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</h1></NullScreen>;
  }

  return (
    <>
      {hotelBooking
        ? <HotelFinal booking={hotelBooking} showRoomSelection={showRoomSelection} updateBookings={updateBookings}/>
        : <ChooseHotel showRoomSelection={showRoomSelection} hideRoomSelection={hideRoomSelection}/>
      }
      {rooms && <RoomSelection rooms={rooms} setRooms={setRooms} updateBookings={updateBookings} />}
    </>
  );
}
