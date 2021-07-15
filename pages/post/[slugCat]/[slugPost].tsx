import { HomeOutlined } from "@ant-design/icons";
import ImgContainerCss from "@components/ImgContainerCss";
import Layout from "@components/Layout";
import Loading from "@components/Loading";
import NextSeoHeader from "@components/NextSeoHeader";
import IPost from "@data/IPost";
import Container from "@styles/Container";
import { Breadcrumb, Space } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import FirestoreApi from "firebase/FirebaseApi";
import initFirebase from "firebase/firebaseInit";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";
import DateUtils from "utils/DateUtils";

type Props = {
  post: IPost;
};

export default function Post({ post }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!router.isFallback && post._catId && post.slug) {
      const firebase = initFirebase();
      firebase.analytics().logEvent("page_view", {
        page_location: window.location.href,
        page_path: `/post/${post._catId.slug}/${post.slug}`,
        page_title: post.titulo,
      });
    }
  }, [router.isFallback, post]);

  if (router.isFallback) return <Loading />;

  const imgExibicao = post._imgExibicao;

  return (
    <Layout>
      <NextSeoHeader
        title={post.titulo}
        description={post.resumo}
        urlImg={imgExibicao?.[0].url.xs}
      />
      <Container>
        <Space size="small" direction="vertical">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href={`/post/${post._catId?.slug}`}>
              <span>{post._catId?.titulo}</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Publicação</Breadcrumb.Item>
          </Breadcrumb>

          <Title>{post.titulo}</Title>
          <Title type="secondary" level={5}>
            {post.resumo}
          </Title>
          <div>
            <Text>{DateUtils.formatarDataUX({ data: post.updatedAt })}</Text>
          </div>
          <hr />

          <div>
            {imgExibicao && (
              <ImgContainerPostCss>
                <Image
                  layout="responsive"
                  objectFit="contain"
                  src={imgExibicao?.[0].url.md}
                  alt={post.titulo}
                  width={400}
                  height={300}
                />
              </ImgContainerPostCss>
            )}
            <Text>
              <span
                dangerouslySetInnerHTML={{
                  __html: post.conteudo,
                }}
              ></span>
            </Text>
          </div>
        </Space>
      </Container>
    </Layout>
  );
}

const ImgContainerPostCss = styled(ImgContainerCss)`
  float: right;
  width: 400px;
  height: 300px;
  margin-left: 10px;

  @media only screen and (max-width: 900px) {
    float: none;
    margin: 10px auto;
    width: 300px;
    height: 200px;
  }
`;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

type Params = {
  params: {
    slugPost: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const fb = new FirestoreApi();
  let post = (await fb.getDocBySlug("posts", params.slugPost)) as IPost;

  return {
    props: { post },
  };
}
