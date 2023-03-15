import styled from 'styled-components';
import { StageBlock } from './StageBlock';

export function Stages({ stages, date, updateStages }) {
  return (
    <StagesStyle>
      {stages.map(e => <StageBlock key={e.id} stage={e} date={date} updateStages={updateStages}/>)}
    </StagesStyle>
  );
}

const StagesStyle = styled.div`
  display: flex;

  .block:not(:first-child) .inner {
    border-left: none;
  }
`;
