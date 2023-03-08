import { BsPerson, BsPersonFill } from 'react-icons/bs';
import styled from 'styled-components';
import { IconContext } from 'react-icons';

export function Room({ data, selectedRoom, handleOptionChange }) {
  const { id, name, capacity, _count: { Booking: bookings } } = data;
  const vacancy = capacity - bookings;
  const offset = (+selectedRoom === id);

  return (
    <IconContext.Provider value={{ size: 25, color: vacancy ? 'black' : '#8C8C8C' }}>
      <RoomStyle vacancy={vacancy}>
        <input type="radio" name="hotel-room" value={id} id={name} disabled={!vacancy} onChange={handleOptionChange}/>
        <label htmlFor={name}>
          <div className='name'>{name}</div>
          <div className='capacity'>
            {Array(capacity).fill(null).map((e, i) => (i < vacancy - offset) ? <BsPerson key={i}/> : <BsPersonFill key={i}/>)}
          </div>
        </label>
      </RoomStyle>
    </IconContext.Provider>
  );
}

const RoomStyle = styled.div`
  input {
    display: none;
  }

  label {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px 0 16px;
    width: 190px;
    height: 45px;

    border: 1px solid #CECECE;
    border-radius: 10px;
    line-height: 1px;

    font-family: 'Roboto';
    font-weight: 700;
    font-size: 20px;
    color: #454545;
  }

  input:checked + label {
    background: #FFEED2;
    .capacity > :nth-child(${props => props.vacancy}) {
      fill: #FF4791;
    }
  }

  input:disabled + label {
    cursor: default;
    background: #E9E9E9;
    color: #9D9D9D;
  }
`;
