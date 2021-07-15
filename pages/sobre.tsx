import { HomeOutlined } from "@ant-design/icons";
import CardsSobre from "@components/CardSobre";
import Layout from "@components/Layout";
import NextSeoHeader from "@components/NextSeoHeader";
import Container from "@styles/Container";
import { Breadcrumb, Space } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";

export default function Sobre() {
  return (
    <Layout>
      <NextSeoHeader title={"Sobre"} description="Tudo sobre o site" />
      <Container>
        <Space size="small" direction="vertical">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Página</Breadcrumb.Item>
          </Breadcrumb>

          <Title>Sobre</Title>
          <hr />

          <Text>
            <p>
              O Universo Oposto é um site para não ser levado a sério. As
              notícias são apenas para se divertir, e não para se informar.
            </p>
            <p>Portanto, a finalidade é ser:</p>
          </Text>

          <CardsSobre />
        </Space>
      </Container>
    </Layout>
  );
}
