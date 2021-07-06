import Container from "@styles/Container";
import { Col, Row } from "antd";
import styled from "styled-components";

export default function Footer(): JSX.Element {
  return (
    <FooterCss>
      <Container>
        <Row justify="center">
          <Col>Um site de humor</Col>
        </Row>
      </Container>
    </FooterCss>
  );
}

const FooterCss = styled.footer`
  padding: 50px;
  margin-top: 50px;
  background: #eee;
`;
