import { useEffect, useState } from 'react';
import useBooking from '../../../hooks/api/useBooking';
import useHotelWithRoom from '../../../hooks/api/useHotelWithRoom';
import { RoomSelection } from '../../../components/Hotel/RoomSelection';
import ChooseHotel from '../../../components/Hotel/ChooseHotel';

export default function Hotel() {
  const [rooms, setRooms] = useState(null);
  const { booking, bookingLoading, getBookings } = useBooking();
  const { hotelWithRoom, getHotelWithRoom } = useHotelWithRoom();

  useEffect(() => {
    setRooms(hotelWithRoom?.Rooms);
  }, [hotelWithRoom]);

  if (bookingLoading) return <></>;

  return (
    <>
      <ChooseHotel />
      {rooms && <RoomSelection rooms={rooms} setRooms={setRooms} updateBookings={getBookings} />}
    </>
  );
}
