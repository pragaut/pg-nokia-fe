import styled from 'styled-components';

export default styled.div`
  display: block;
  width: ${props => props.w || '100%'};
  height: ${props => props.h || '1rem'};
`;
