import siteJson from "@data/site.json";
import Container from "@styles/Container";
import { Col, Menu, Row } from "antd";
import Title from "antd/lib/typography/Title";
import Link from "next/link";
import styled from "styled-components";

export default function Footer(): JSX.Element {
  return (
    <FooterCss>
      <Container>
        <Row justify="space-between" align="middle">
          <Col>
            <TitleCss level={4}>{siteJson.fraseFinal}</TitleCss>
          </Col>
          <Col>
            <Menu theme="dark">
              {/* <Menu.Item key="buscar" icon={<SearchOutlined />}>
              Buscar
            </Menu.Item> */}
              <Menu.Item key="sobre">
                <Link href={"/sobre"} passHref>
                  <a>Sobre</a>
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Container>
    </FooterCss>
  );
}

const TitleCss = styled(Title)`
  color: #a1bfd2 !important;
`;

const FooterCss = styled.footer`
  padding: 20px;
  margin-top: 50px;
  border-top: 4px solid #a1bfd2;
  background: #194560;
`;
