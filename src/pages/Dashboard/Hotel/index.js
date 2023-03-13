import { useEffect, useState } from 'react';
import useBooking from '../../../hooks/api/useBooking';
import useHotelWithRoom from '../../../hooks/api/useHotelWithRoom';
import { RoomSelection } from '../../../components/Hotel/RoomSelection';
import ChooseHotel from '../../../components/Hotel/ChooseHotel';
import axios from 'axios';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const [rooms, setRooms] = useState(null);
  const [ticketStatus, setTicketStatus] = useState(null);
  const { booking, bookingLoading, getBookings } = useBooking();
  const { hotelWithRoom, getHotelWithRoom } = useHotelWithRoom();
  const showRoomSelection = (id) => getHotelWithRoom(id);
  const hideRoomSelection = () => setRooms(null);
  const token = useToken();

  useEffect(async () => {
    async function getTicketFromUser() {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const ticketId = await axios.get(`${process.env.REACT_APP_API_BASE_URL}tickets/`, config);
        return ticketId;
      } catch (error) {
        console.log(error);
      }
    }
    const userTicket = await getTicketFromUser();
    if (!userTicket) {
      setTicketStatus(null);
    } else if (userTicket.data.status != 'PAID') {
      setTicketStatus('NOT PAID');
    } else if (!userTicket.data.TicketType.includesHotel) {
      setTicketStatus('HOTEL NOT INCLUDED');
    } else {
      setTicketStatus('GOOD');
    }

    setRooms(hotelWithRoom?.Rooms);
  }, [hotelWithRoom]);

  if (bookingLoading) return <></>;

  if (ticketStatus == null) {
    return <h1> Ingresso não encontrado, por favor compre um ingresso antes de acessar esta página.</h1>;
  }

  if (ticketStatus == 'NOT PAID') {
    return <h1>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h1>;
  }

  if (ticketStatus == 'HOTEL NOT INCLUDED') {
    return <h1>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</h1>;
  }

  return (
    <>
      <ChooseHotel showRoomSelection={showRoomSelection} hideRoomSelection={hideRoomSelection} />
      {rooms && <RoomSelection rooms={rooms} setRooms={setRooms} updateBookings={getBookings} />}
    </>
  );
}
