import { OptionButton } from '../../../components/Dashboard/payment/OptionButton';
import Typography from '@material-ui/core/Typography';
import { OptionsPannel } from '../../../components/Dashboard/payment/OptionsPannel';
import styled from 'styled-components';

export default function Payment() {
  return (
    <>
      <StyledTypography variant="h4">Suas Informações</StyledTypography>
      <OptionsPannel title="Primeiro, escolha sua modalidade de ingresso">
        <OptionButton title="Presencial" subTitle="R$ 250"></OptionButton>
        <OptionButton title="Online" subTitle="R$ 100"></OptionButton>
      </OptionsPannel>
    </>
  );
}

//Styled components

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
