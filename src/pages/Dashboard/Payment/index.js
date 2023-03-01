import { OptionButton } from '../../../components/Dashboard/payment/OptionButton';
import Typography from '@material-ui/core/Typography';
import { OptionsPannel } from '../../../components/Dashboard/payment/OptionsPannel';
import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicketTypes from '../../../hooks/api/useTicketTypes';

const title = 'Ingresso e pagamento';
export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticketTypes } = useTicketTypes();

  if (!enrollment) {
    return (
      enrollment !== null && <EnrollMessage>
        <StyledTypography variant="h4">{title}</StyledTypography>
        <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</p>
      </EnrollMessage>
    );
  }
  
  return (
    <>
      <StyledTypography variant="h4">{title}</StyledTypography>
      <OptionsPannel title="Primeiro, escolha sua modalidade de ingresso">
        {ticketTypes?.map((e) => <OptionButton key={e.id} title={e.name} subTitle={e.price}></OptionButton>)}
      </OptionsPannel>
    </>
  );
}

//Styled components

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const EnrollMessage = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  h4 {
    align-self: flex-start;
  }
  
  p {
    display: flex;
    align-items: center;
    flex: 1;

    max-width: 388px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    text-align: center;

    color: #8E8E8E;
  }
`;
