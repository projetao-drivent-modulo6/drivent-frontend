import { useEffect, useState } from 'react';
import useBooking from '../../../hooks/api/useBooking';
import useHotelWithRoom from '../../../hooks/api/useHotelWithRoom';
import { RoomSelection } from '../../../components/Hotel/RoomSelection';
import ChooseHotel from '../../../components/Hotel/ChooseHotel';
import HotelFinal from '../../../components/Hotel/HotelFinal';

export default function Hotel() {
  const [rooms, setRooms] = useState(null);
  const { booking, bookingLoading, getBookings } = useBooking();
  const { hotelWithRoom, getHotelWithRoom } = useHotelWithRoom();
  const showRoomSelection = (id) => getHotelWithRoom(id);
  const hideRoomSelection = () => setRooms(null);

  useEffect(() => {
    setRooms(hotelWithRoom?.Rooms);
  }, [hotelWithRoom]);

  if (bookingLoading) return <></>;

  return (
    <>
      {booking
        ? <HotelFinal booking={booking} showRoomSelection={showRoomSelection}/>
        : <ChooseHotel showRoomSelection={showRoomSelection} hideRoomSelection={hideRoomSelection}/>
      }
      {rooms && <RoomSelection rooms={rooms} setRooms={setRooms} updateBookings={getBookings} />}
    </>
  );
}
