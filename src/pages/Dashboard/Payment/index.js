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
  const [selectedOptions, setSelectedOptions] = useState({ firstOption: null, secondOption: null });

  function changeScreenState() {
    setProv(true);
  }

  const secontPannelData = [
    { id: 1, name: 'Sem Hotel', price: 0 },
    { id: 2, name: 'Com Hotel', price: 350 },
  ];

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
        <OptionsPannel
          selectedIndex={selectedOptions.firstOption?.index}
          title="Primeiro, escolha sua modalidade de ingresso"
        >
          {ticketTypes?.map((e, index) => (
            <OptionButton
              onClick={() => {
                setSelectedOptions({
                  ...selectedOptions,
                  secondOption: null,
                  firstOption: { index: index, title: e.name, price: e.price },
                });
              }}
              key={e.id}
              title={e.name}
              subTitle={e.price}
            ></OptionButton>
          ))}
        </OptionsPannel>
        {selectedOptions.firstOption != null && selectedOptions.firstOption?.title != 'Remoto' && (
          <OptionsPannel
            selectedIndex={selectedOptions.secondOption?.index}
            title="Agora, escolha sua modalidade de ingresso"
          >
            {secontPannelData.map((e, index) => (
              <OptionButton
                onClick={() => {
                  setSelectedOptions({
                    ...selectedOptions,
                    secondOption: { index: index, title: e.name, price: e.price },
                  });
                }}
                key={e.id}
                title={e.name}
                subTitle={`+ ${e.price}`}
              ></OptionButton>
            ))}
          </OptionsPannel>
        )}
        {(selectedOptions.secondOption != null || selectedOptions.firstOption?.title == 'Remoto') && (
          <ConfirmButton
            onClick={changeScreenState}
            title={`Fechado! O total ficou em R$ ${
              selectedOptions.secondOption?.price
                ? selectedOptions?.firstOption?.price + selectedOptions.secondOption?.price
                : selectedOptions?.firstOption?.price
            }. Agora é só confirmar:`}
            selectedOptions={selectedOptions}
            confirmBox="RESERVAR INGRESSO"
          ></ConfirmButton>
        )}
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
}

//Styled components

const DisplayCard = styled.div`
  padding: 5px;
  p {
    margin-bottom: 10px;
    width: 169px;
    height: 23px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
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
