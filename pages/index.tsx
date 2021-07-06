import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import PostDestaque from "@components/PostDestaque";
import PostVertical from "@components/PostVertical";
import Ad from "@styles/Ad";
import Container from "@styles/Container";
import { Col, Row } from "antd";
import styled from "styled-components";

export default function Home() {
  return (
    <MainCss>
      <Navbar />

      <section>
        <Container>
          <RowCorpoCss gutter={24}>
            <Col span={17}>
              <Row>
                <Col>
                  <PostDestaque />
                </Col>
              </Row>
              <RowSubdestaqueCss>
                <Col span={12}>
                  <PostVertical />
                </Col>
                <Col span={12}>
                  <PostVertical />
                </Col>
              </RowSubdestaqueCss>
              <Row>
                <Col span={24}>
                  <Ad style={{ height: 100 }} />
                </Col>
              </Row>
            </Col>
            <ColSidebarCss span={7}>
              <Row justify="end">
                <PostVertical comImg />
                <Ad />
                <PostVertical />
              </Row>
            </ColSidebarCss>
          </RowCorpoCss>
        </Container>
      </section>
      <Footer />
    </MainCss>
  );
}

const RowCorpoCss = styled(Row)`
  margin: 50px 0 0 0;
`;

const RowSubdestaqueCss = styled(Row)`
  border-top: 1px solid #ccc;
  margin: 20px 0 0 0;
  padding: 20px 0 0 0;
`;

const ColSidebarCss = styled(Col)`
  border-left: 1px solid #ccc;
`;

const MainCss = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;
