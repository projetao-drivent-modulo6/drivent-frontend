import styled from 'styled-components';

export const OptionsPannel = (props) => {
  return (
    <PannelContainer>
      <p>{props.title}</p>
      <Options selectedIndex={props.selectedIndex}>{props.children}</Options>
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

  margin-bottom: 20px;
`;

const Options = styled.div`
  display: flex;

  > * {
    margin-right: 24px;
    cursor: pointer;
  }

  > button:nth-child(${(props) => props.selectedIndex + 1}) {
    background-color: #ffeed2;
  }
`;
