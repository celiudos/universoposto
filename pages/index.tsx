import Layout from "@components/Layout";
import PostDestaque from "@components/PostDestaque";
import PostVertical from "@components/PostVertical";
import categoriasMock from "@data/categorias.json";
import ICategoria from "@data/ICategoria";
import IPost from "@data/IPost";
import postsMock from "@data/posts.json";
import Ad from "@styles/Ad";
import Container from "@styles/Container";
import { Col, Row } from "antd";
import styled from "styled-components";

type Props = {
  postDestaque: IPost;
  postsSubdestaque: IPost[];
  postsSidebar: IPost[];
};

export default function Home({
  postDestaque,
  postsSubdestaque,
  postsSidebar,
}: Props) {
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

export async function getStaticProps() {
  const categorias = categoriasMock as ICategoria[];
  const posts = postsMock.map((p) => ({
    ...p,
    cat: categorias.filter((c) => c.id === p.catId)[0],
  })) as IPost[];

  return {
    props: {
      postDestaque: posts[0],
      postsSubdestaque: [posts[1], posts[2]],
      postsSidebar: [posts[3], posts[4]],
    },
  };
}
