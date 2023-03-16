import styled from 'styled-components';
import useSaveActivityBooking from '../../hooks/api/useSaveActivityBooking';
import esgotadoImage from '../../../src/assets/images/close.png';
import disponivelImage from '../../../src/assets/images/enter.png';
import inscritoImage from '../../../src/assets/images/check.png';
import { toast } from 'react-toastify';

export function Activity({ activity, time, updateStages }) {
  const { id, name, duration, capacity, bookingCount, registered } = activity;
  const { saveActivityBooking } = useSaveActivityBooking();
  const initialTime = time.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  async function bookActivity() {
    if (capacity !== 0 && bookingCount < capacity) {
      try {
        await saveActivityBooking(id);
      } catch (error) {
        const { status } = error.response;
        if (status === 409) toast('Horário conflitante, não foi possivel se inscrever.');
      }
      updateStages();
    }
  }

  return (
    <ActivityStyle className="activity" duration={duration} registered={registered}>
      <div className="info">
        <div className="act-title">{name}</div>
        <div className="act-time">
          {initialTime}:00 - {time + duration}:00
        </div>
      </div>

      <div className="status" onClick={bookActivity}>
        <Container>
          {registered ? (
            <>
              <img src={inscritoImage} alt="Inscrito" />
              <StatusText>Inscrito</StatusText>
            </>
          ) : capacity === 0 || bookingCount === capacity ? (
            <>
              <img src={esgotadoImage} alt="Esgotado" />
              <StatusText esgotado>Esgotado</StatusText>
            </>
          ) : (
            <>
              <img src={disponivelImage} alt="Disponível" />
              <StatusText>
                {capacity - bookingCount}
                {' vagas'}
              </StatusText>
            </>
          )}
        </Container>
      </div>
    </ActivityStyle>
  );
}

const ActivityStyle = styled.div`
  display: flex;
  width: 100%;
  height: ${(props) => 80 * props.duration + 12 * Math.max(0, props.duration - 1) + 'px'};
  padding: 12px;
  padding-right: 6px;

  background-color: ${(props) => (props.registered ? '#D0FFDB' : '#F1F1F1')};
  border-radius: 5px;

  font-size: 12px;
  color: #343434;

  .info {
    width: 77%;
  }

  .act-title {
    font-weight: 700;
    margin-bottom: 6px;
  }

  .status {
    cursor: pointer;
    width: 23%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${(props) => (props.registered ? '#99E8A1' : '#CFCFCF')};
    font-size: 9px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: 5px;
  }
`;

const StatusText = styled.p`
  color: ${(props) => (props.esgotado ? '#CC6666' : '#078632')};
`;
