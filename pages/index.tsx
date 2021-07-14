import Layout from "@components/Layout";
import NextSeoHeader from "@components/NextSeoHeader";
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
  return (
    <Layout>
      <NextSeoHeader />
      <Container>
        <RowCorpoCss gutter={[{ lg: 32 }, 16]}>
          <Col>
            {postDestaque && (
              <Row>
                <Col>
                  <PostDestaque post={postDestaque} />
                </Col>
              </Row>
            )}
          </Col>
        </RowCorpoCss>
        <RowCorpoCss gutter={[{ lg: 32 }, 16]}>
          <Col xs={24} xl={17}>
            <RowSubdestaqueCss>
              {postsSubdestaque
                ? postsSubdestaque.map((post, key) => (
                    <Col key={key} xs={24} xl={12}>
                      <PostVertical grande={true} post={post} />
                    </Col>
                  ))
                : null}
            </RowSubdestaqueCss>
            <Row>
              <Col xs={0} xl={24}>
                <Ad style={{ height: 100 }} />
              </Col>
            </Row>
          </Col>
          <ColSidebarCss xs={24} xl={7}>
            <Row>
              <Col xs={24} sm={0} xl={24}>
                <Ad style={{ height: 300, width: 300, marginBottom: 20 }} />
              </Col>
              {postsSidebar
                ? postsSidebar.map((post, key) => (
                    <Col xs={24} key={key}>
                      <PostVertical post={post} />
                    </Col>
                  ))
                : null}
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

const RowSubdestaqueCss = styled(Row)``;

const ColSidebarCss = styled(Col)`
  border-left: 1px solid #ccc;

  @media only screen and (max-width: 1250px) {
    border-left: none;
  }
`;

export const getStaticProps = async () => {
  const fb = new FirestoreApi();
  let postDestaques,
    postsSubdestaque,
    postsSidebar: IPost[] = [];

  try {
    postDestaques = (await fb.getPosts({
      isDestaque: true,
      mockFile: "postsDestaques",
    })) as IPost[];
    postsSubdestaque = postDestaques.slice(1);
  } catch (error) {}

  try {
    postsSidebar = (await fb.getPosts({
      isDestaque: false,
      mockFile: "postsSidebar",
    })) as IPost[];
  } catch (error) {}

  // console.log("postDestaque:", postDestaque);

  return {
    props: {
      postDestaque: postDestaques?.[0] || null,
      postsSubdestaque: postsSubdestaque || [],
      postsSidebar: postsSidebar || [],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
};
