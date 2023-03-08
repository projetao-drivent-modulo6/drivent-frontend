import { useEffect, useState } from 'react';
import useBooking from '../../../hooks/api/useBooking';
import useHotelWithRoom from '../../../hooks/api/useHotelWithRoom';
import { RoomSelection } from '../../../components/Hotel/RoomSelection';

export default function Hotel() {
  const [rooms, setRooms] = useState(null);
  const { booking, bookingLoading, getBookings } = useBooking();
  const { hotelWithRoom, getHotelWithRoom } = useHotelWithRoom();

  useEffect(() => {
    setRooms(hotelWithRoom?.Rooms);
  }, [hotelWithRoom]);

  if (bookingLoading) return (<></>);
  
  return (
    <>
      {rooms && <RoomSelection rooms={rooms} setRooms={setRooms} updateBookings={getBookings}/>}
    </>
  );
}
