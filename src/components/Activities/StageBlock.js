import styled from 'styled-components';
import { Activity } from './Activity';

export function StageBlock({ stage, date, updateStages }) {
  const activities = stage.Activities.filter(e => new Date(e.date).getTime() === date);
  let time = 9;

  return (
    <BlockStyle className='block'>
      <div className='stage-title'>{stage.name}</div>
      <div className='inner'>
        {activities.map(e => {
          const jsx = (<Activity key={e.id} activity={e} time={time} updateStages={updateStages}/>);
          time += e.duration;
          return jsx;
        })}
      </div>
    </BlockStyle>
  );
}

const BlockStyle = styled.div`
  font-family: 'Roboto';
  flex: 1;

  .stage-title {
    font-size: 17px;
    text-align: center;
    color: #7B7B7B;
    margin-bottom: 14px;
  }

  .inner {
    display: flex;
    flex-direction: column;
    gap: 12px;

    padding: 12px;
    height: 390px;
    border: 1px solid #D7D7D7;
  }
`;
