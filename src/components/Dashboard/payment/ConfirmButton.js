import styled from 'styled-components';
export const ConfirmButton = (props) => {
  const { selectedOptions } = props;
  return (
    <>
      <ConfirmPhraseContainer>
        <p>{props.title}</p>
      </ConfirmPhraseContainer>
      <ConfirmButtonContainer
        onClick={() =>
          alert(
            `Seu pedido será confirmado em breve. O total ficou em R$ ${
              selectedOptions.secondOption?.price
                ? selectedOptions?.firstOption?.price + selectedOptions.secondOption?.price
                : selectedOptions?.firstOption?.price
            }.`
          )
        }
      >
        <p>{props.confirmBox}</p>
      </ConfirmButtonContainer>
    </>
  );
};

// Styled components

const ConfirmPhraseContainer = styled.div`
  p {
    font-size: 20px;
    font-weight: 400;
    color: #8e8e8e;
    margin-top: 43px;
    margin-bottom: 28px;
  }
`;

const ConfirmButtonContainer = styled.button`
  padding: 10px;
  width: 168px;
  height: 37px;
  background-color: #e0e0e0;
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  cursor: pointer;

  p {
    font-size: 14px;
    color: #000000;
    font-weight: 500;
    line-height: 16px;
  }
`;
