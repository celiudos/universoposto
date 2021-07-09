import Layout from "@components/Layout";
import NextSeoHeader from "@components/NextSeoHeader";
import Container from "@styles/Container";
import { Empty } from "antd";

export default function Custom404() {
  return (
    <Layout>
      <NextSeoHeader title="Página não encontrada" description="Erro 404" />
      <Container>
        <Empty description="Página não encontrada" />
      </Container>
    </Layout>
  );
}
