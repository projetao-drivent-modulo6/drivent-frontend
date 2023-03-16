import styled from 'styled-components';
export const ConfirmButton = (props) => {
  //const { selectedOptions } = props;
  return (
    <>
      <ConfirmPhraseContainer>
        <p>{props.title}</p>
      </ConfirmPhraseContainer>
      <ConfirmButtonContainer
        onClick={props.onClick}
      >
        <p id='title2'>{props.confirmBox}</p>
      </ConfirmButtonContainer>
    </>
  );
};

// Styled components

const ConfirmPhraseContainer = styled.div`
  p {
    font-size: 15px;
    font-weight: 400;
    color: #8e8e8e;
    margin-top: 43px;
    margin-bottom: 28px;
  }
`;

const ConfirmButtonContainer = styled.button`
  padding: 10px;
  width: 185px;
  height: 37px;
  background-color: #e0e0e0;
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  cursor: pointer;

  #title2 {
    font-size: 15px;
    color: #000000;
    font-weight: 500;
    line-height: 16px;
  }
`;
