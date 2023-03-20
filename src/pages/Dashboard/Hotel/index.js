import { useEffect, useState } from 'react';
import useBooking from '../../../hooks/api/useBooking';
import useHotelWithRoom from '../../../hooks/api/useHotelWithRoom';
import { RoomSelection } from '../../../components/Hotel/RoomSelection';
import ChooseHotel from '../../../components/Hotel/ChooseHotel';
import HotelFinal from '../../../components/Hotel/HotelFinal';
import useToken from '../../../hooks/useToken';
import axios from 'axios';
import styled from 'styled-components';
import { StyledTypography } from '../Payment';

export const NullScreen = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  h4 {
    align-self: flex-start;
  }

  h1 {
    display: flex;
    align-items: center;
    flex: 1;

    max-width: 500px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    text-align: center;

    color: #8e8e8e;
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
  const title = 'Escolha de hotel e quarto';

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
  }, []);

  useEffect(() => {
    setHotelBooking(booking);
  }, [booking]);

  useEffect(() => {
    setRooms(hotelWithRoom?.Rooms);
  }, [hotelWithRoom]);

  async function updateBookings() {
    try {
      await getBookings();
    } catch (error) {
      setHotelBooking(null);
    }
  }

  if (bookingLoading) return (<StyledTypography variant="h4">{title}</StyledTypography>);
  if (ticketStatus == null) {
    return <NullScreen>
      <StyledTypography variant="h4">{title}</StyledTypography>
      <h1> Ingresso não encontrado, por favor compre um ingresso antes de acessar esta página.</h1>
    </NullScreen>;
  }

  if (ticketStatus === 'NOT PAID') {
    return <NullScreen>
      <StyledTypography variant="h4">{title}</StyledTypography>
      <h1>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h1>
    </NullScreen>;
  }

  if (ticketStatus === 'HOTEL NOT INCLUDED') {
    return <NullScreen>
      <StyledTypography variant="h4">{title}</StyledTypography>
      <h1>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</h1>
    </NullScreen>;
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
