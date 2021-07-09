import Layout from "@components/Layout";
import PostDestaque from "@components/PostDestaque";
import PostVertical from "@components/PostVertical";
import IPost from "@data/IPost";
import Ad from "@styles/Ad";
import Container from "@styles/Container";
import { Col, Row } from "antd";
import FirestoreApi from "firebase/FirebaseApi";
import { InferGetStaticPropsType } from "next";
import styled from "styled-components";

export default function Home({
  postDestaque,
  postsSubdestaque,
  postsSidebar,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // console.log("postDestaque:", postDestaque);

  return (
    <Layout>
      <Container>
        <RowCorpoCss gutter={24}>
          <Col span={17}>
            <Row>
              <Col>
                <PostDestaque post={postDestaque} />
              </Col>
            </Row>
            <RowSubdestaqueCss>
              {postsSubdestaque
                ? postsSubdestaque.map((post, key) => (
                    <Col key={key} span={12}>
                      <PostVertical post={post} />
                    </Col>
                  ))
                : null}
            </RowSubdestaqueCss>
            <Row>
              <Col span={24}>
                <Ad style={{ height: 100 }} />
              </Col>
            </Row>
          </Col>
          <ColSidebarCss span={7}>
            <Row justify="end">
              {postsSidebar
                ? postsSidebar.map((post, key) => (
                    <Col key={key}>
                      <PostVertical post={post} />
                    </Col>
                  ))
                : null}
              <Ad />
            </Row>
          </ColSidebarCss>
        </RowCorpoCss>
      </Container>
    </Layout>
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

export const getStaticProps = async () => {
  const fb = new FirestoreApi();
  const postDestaques = (await fb.getPosts(true)) as IPost[];
  const postDestaque = postDestaques[0];
  const postsSubdestaque = postDestaques.slice(1);

  const postsSidebar = (await fb.getPosts()) as IPost[];

  return {
    props: {
      postDestaque: postDestaques[0],
      postsSubdestaque: postsSubdestaque,
      postsSidebar: postsSidebar,
    },
  };
};
