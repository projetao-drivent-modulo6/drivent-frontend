import { OptionButton } from '../../../components/Dashboard/payment/OptionButton';
import Typography from '@material-ui/core/Typography';
import { OptionsPannel } from '../../../components/Dashboard/payment/OptionsPannel';
import styled from 'styled-components';
import { ConfirmButton } from '../../../components/Dashboard/payment/ConfirmButton';
import useEnrollment from '../../../hooks/api/useEnrollment';
import PaymentCardScreen from './paymentPage';
import { useState } from 'react';
import PaymentConfirmation from './PaymentConfirmation';
import { toast } from 'react-toastify';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import { useEffect } from 'react';

const title = 'Ingresso e pagamento';
export default function Payment() {
  const { enrollment } = useEnrollment();
  const [prov, setProv] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({ firstOption: null, secondOption: null });
  const [userTicketId, setUserTicketId] = useState(null);
  const token = useToken();

  function changeScreenState() {
    setProv(2);
  }
  const firstPannelData = [
    { id: 1, name: 'Remoto', price: 100 },
    { id: 2, name: 'Presencial', price: 350 },
  ];
  const secontPannelData = [
    { id: 1, name: 'Sem Hotel', price: 0 },
    { id: 2, name: 'Com Hotel', price: 350 },
  ];

  async function searchForUserTicket() {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}tickets/`, config);
      setUserTicketId(response.data.id);

      const firstPannelData = [
        { index: 1, title: 'Remoto', price: 100 },
        { index: 2, title: 'Presencial', price: 350 },
      ];
      const secontPannelData = [
        { index: 1, title: 'Sem Hotel', price: 0 },
        { index: 2, title: 'Com Hotel', price: 350 },
      ];
    
      const { data } = response;
      let firstOption;
      let secondOption;
      if(data.TicketType.name === 'PresencialComHotel') {
        firstOption = firstPannelData[1];
        secondOption = secontPannelData[1];
      } else if(data.TicketType.name === 'PresencialSemHotel') {
        firstOption = firstPannelData[1];
        secondOption = secontPannelData[0];
      } else {
        firstOption = firstPannelData[0];
        secondOption = null;
      }

      setSelectedOptions({ firstOption, secondOption });
      setProv(response.data.status === 'PAID' ? 3 : 2);
    } catch (error) { // eslint-disable-next-line
      console.log(error);
    }
  }

  useEffect(() => {
    searchForUserTicket();
  }, []);

  const postUserTicket = async() => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}tickets/types`, config);

      let selectedTicketTypeId;
      const selectedTicketTypeBooleans = { isRemote: null, includesHotel: null };

      if (!selectedOptions.secondOption) {
        selectedTicketTypeBooleans.isRemote = true;
        selectedTicketTypeBooleans.includesHotel = false;
      } else if (selectedOptions.secondOption.title === 'Com Hotel') {
        selectedTicketTypeBooleans.isRemote = false;
        selectedTicketTypeBooleans.includesHotel = true;
      } else {
        selectedTicketTypeBooleans.isRemote = false;
        selectedTicketTypeBooleans.includesHotel = false;
      }

      response.data.forEach((tickeTypeObj) => {
        if (
          tickeTypeObj.includesHotel === selectedTicketTypeBooleans.includesHotel &&
          tickeTypeObj.isRemote === selectedTicketTypeBooleans.isRemote
        ) {
          selectedTicketTypeId = tickeTypeObj.id;
        }
      });

      const responsePostTicket = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}tickets`,
        { ticketTypeId: selectedTicketTypeId },
        config
      );

      setUserTicketId(responsePostTicket.data.id);

      toast('Ticket criado com sucesso!');

      setTimeout(() => changeScreenState(), 500);
    } catch (error) { // eslint-disable-next-line
      console.log(error);
    }
  };

  if (!enrollment) {
    return (
      <EnrollMessage>
        <StyledTypography variant="h4">{title}</StyledTypography>
        <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</p>
      </EnrollMessage>
    );
  }

  if (prov === 1) {
    return (
      <>
        <StyledTypography variant="h4">{title}</StyledTypography>
        <OptionsPannel
          selectedIndex={selectedOptions.firstOption?.index}
          title="Primeiro, escolha sua modalidade de ingresso"
        >
          {firstPannelData.map((e, index) => (
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
        {selectedOptions.firstOption !== null && selectedOptions.firstOption?.title !== 'Remoto' && (
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
        {(selectedOptions.secondOption !== null || selectedOptions.firstOption?.title === 'Remoto') && (
          <ConfirmButton
            onClick={postUserTicket}
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
  } else if (prov === 2) {
    return (
      <DisplayCard>
        <StyledTypography variant="h4">{title}</StyledTypography>
        <p>Ingresso escolhido</p>
        <PaymentCardScreen
          userTicketId={userTicketId}
          selectedOptions={selectedOptions}
          setProv={setProv}
        ></PaymentCardScreen>
      </DisplayCard>
    );
  } else if (prov === 3) {
    return <PaymentConfirmation selectedOptions={selectedOptions}></PaymentConfirmation>;
  }
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

export const StyledTypography = styled(Typography)`
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
