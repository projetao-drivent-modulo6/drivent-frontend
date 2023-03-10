import { useEffect, useState } from 'react';
import useBooking from '../../../hooks/api/useBooking';
import useHotelWithRoom from '../../../hooks/api/useHotelWithRoom';
import { RoomSelection } from '../../../components/Hotel/RoomSelection';
import ChooseHotel from '../../../components/Hotel/ChooseHotel';
import HotelFinal from '../../../components/Hotel/HotelFinal';

export default function Hotel() {
  const [rooms, setRooms] = useState(null);
  const [hotelBooking, setHotelBooking] = useState(null);
  const { booking, bookingLoading, getBookings } = useBooking();
  const { hotelWithRoom, getHotelWithRoom } = useHotelWithRoom();
  const showRoomSelection = (id) => getHotelWithRoom(id);
  const hideRoomSelection = () => setRooms(null);

  useEffect(() => {
    setRooms(hotelWithRoom?.Rooms);
  }, [hotelWithRoom]);

  useEffect(() => {
    setHotelBooking(booking);
  }, [booking]);

  async function updateBookings() {
    try {
      await getBookings();
    } catch (error) {
      setHotelBooking(null);
    }
  }

  if (bookingLoading) return <></>;

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
