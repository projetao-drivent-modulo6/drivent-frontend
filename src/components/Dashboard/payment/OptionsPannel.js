import styled from 'styled-components';

export const OptionsPannel = (props) => {
  return (
    <PannelContainer>
      <p>{props.title}</p>
      <Options>{props.children}</Options>
    </PannelContainer>
  );
};

//Styled components

const PannelContainer = styled.div`
  > p {
    font-size: 20px;
    line-height: 23px;

    color: #8e8e8e;

    margin-bottom: 17px;
  }
`;
const Options = styled.div`
  display: flex;

  > * {
    margin-right: 24px;
    cursor: pointer;
  }
`;
