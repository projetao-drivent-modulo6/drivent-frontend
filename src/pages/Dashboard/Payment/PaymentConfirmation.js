import confirm from '../../../assets/images/Vector.png';
import Typography from '@material-ui/core/Typography';
import { OptionsPannel } from '../../../components/Dashboard/payment/OptionsPannel';
import styled from 'styled-components';

export default function PaymentConfirmation() {
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <OptionsPannel title="Ingresso escolhido"></OptionsPannel>
      <StyledInfo>
        <p>Presencial + Com Hotel </p> <p>R$600</p>
      </StyledInfo>
      <StyledPagamento> Pagamento</StyledPagamento>

      <StyledConfirmation>
        <img src={confirm} alt="confirm" />
        <h3>
          <strong> Pagamento confirmado!</strong> <br />
          Prossiga para escolha de hospedagem e atividades
        </h3>
      </StyledConfirmation>
    </>
  );
}
const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const StyledInfo = styled.div`
  width: 290px;
  height: 108px;
  display: flex;
  flex-direction: column;
  background: #ffeed2;
  border-radius: 20px;
  margin-bottom: 15px;
  align-items: center;
  justify-content: center;
`;
const StyledPagamento = styled.h1`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;
const StyledConfirmation = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  h3 {
    margin-left: 15px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: gray;
  }
`;
