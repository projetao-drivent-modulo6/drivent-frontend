import styled from 'styled-components';
export const OptionButton = (props) => {
  return (
    <OptionButtonContainer onClick={props.onClick}>
      <p>{props.title}</p>
      <p>{props.subTitle}</p>
    </OptionButtonContainer>
  );
};

// Styled components

const OptionButtonContainer = styled.button`
  width: 145px;
  height: 145px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid #cecece;
  border-radius: 20px;

  background-color: transparent;

  > p:first-child {
    font-size: 16px;
    color: #454545;
    line-height: 18.75px;
  }

  > p:last-child {
    font-size: 16px;
    color: #898989;
    line-height: 16.41px;
  }
`;
