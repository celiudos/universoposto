import styled from "styled-components";

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;

  @media only screen and (max-width: 1250px) {
    width: auto !important;
    margin: 0 20px;
  }
`;

export default Container;
