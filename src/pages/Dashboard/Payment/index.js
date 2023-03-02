import { OptionButton } from '../../../components/Dashboard/payment/OptionButton';
import Typography from '@material-ui/core/Typography';
import { OptionsPannel } from '../../../components/Dashboard/payment/OptionsPannel';
import styled from 'styled-components';
import { ConfirmButton } from '../../../components/Dashboard/payment/ConfirmButton';

export default function Payment() {
  return (
    <>
      <StyledTypography variant="h4">Suas Informações</StyledTypography>
      <OptionsPannel title="Primeiro, escolha sua modalidade de ingresso">
        <OptionButton title="Presencial" subTitle="R$ 250"></OptionButton>
        <OptionButton title="Online" subTitle="R$ 100"></OptionButton>
      </OptionsPannel>
      <ConfirmButton
        title="Fechado! O total ficou em R$ 600. Agora é só confirmar:"
        confirmBox="RESERVAR INGRESSO"
      ></ConfirmButton>
    </>
  );
}

//Styled components

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
