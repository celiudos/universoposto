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
            <Title level={4}>{siteJson.fraseFinal}</Title>
          </Col>
          <Col>
            <Menu theme="dark">
              {/* <Menu.Item key="buscar" icon={<SearchOutlined />}>
              Buscar
            </Menu.Item> */}
              <Menu.Item key="sobre">
                <Link href={"/page/sobre"} passHref>
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

const FooterCss = styled.footer`
  padding: 50px;
  margin-top: 50px;
  background: #eee;
`;
