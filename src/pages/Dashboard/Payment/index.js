import { OptionButton } from '../../../components/Dashboard/payment/OptionButton';
import Typography from '@material-ui/core/Typography';
import { OptionsPannel } from '../../../components/Dashboard/payment/OptionsPannel';
import styled from 'styled-components';
import { ConfirmButton } from '../../../components/Dashboard/payment/ConfirmButton';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicketTypes from '../../../hooks/api/useTicketTypes';
import PaymentCardScreen from './paymentPage';
import { useState } from 'react';

const title = 'Ingresso e pagamento';
export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticketTypes } = useTicketTypes();
  const [prov, setProv] = useState(false);

  function changeScreenState() {
    setProv(true);
  }

  if (!enrollment) {
    return (
      enrollment !== null && (
        <EnrollMessage>
          <StyledTypography variant="h4">{title}</StyledTypography>
          <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</p>
        </EnrollMessage>
      )
    );
  }

  if (prov === false) {
    return (
      <>
        <StyledTypography variant="h4">{title}</StyledTypography>
        <OptionsPannel title="Primeiro, escolha sua modalidade de ingresso">
          {ticketTypes?.map((e) => (
            <OptionButton key={e.id} title={e.name} subTitle={e.price}></OptionButton>
          ))}
        </OptionsPannel>
        <ConfirmButton
          onClick={changeScreenState}
          title="Fechado! O total ficou em R$ 600. Agora é só confirmar:"
          confirmBox="RESERVAR INGRESSO"
        ></ConfirmButton>
      </>
    );
  }

  return (
    <DisplayCard>
      <StyledTypography variant="h4">{title}</StyledTypography>
      <p>Ingresso escolhido</p>
      <PaymentCardScreen></PaymentCardScreen>
    </DisplayCard>
  );
};

//Styled components

const DisplayCard = styled.div`
  padding: 5px;
  p{
    margin-bottom: 10px;
    width: 169px;
    height: 23px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8E8E8E;
  }

`;

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

    color: #8e8e8e;
  }
`;
