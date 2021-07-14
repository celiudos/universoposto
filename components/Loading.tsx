import Layout from "@components/Layout";
import Container from "@styles/Container";
import { DisplayFlexCenter } from "@styles/DisplayFlex";
import { Spin } from "antd";

export default function Loading() {
  return (
    <Layout>
      <Container>
        <DisplayFlexCenter>
          <Spin size="large" />
        </DisplayFlexCenter>
      </Container>
    </Layout>
  );
}
