import { Stages } from '../../../components/Activities/Stages';
import useStages from '../../../hooks/api/useStages';

const date = new Date('2023-10-21').getTime();
export default function Activities() {
  const { stages, updateStages } = useStages();

  if (!stages) return (<></>);

  return (
    <>
      {date && <Stages stages={stages} date={date} updateStages={updateStages}/>}
    </>
  );
}

