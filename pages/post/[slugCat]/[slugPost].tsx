import { HomeOutlined } from "@ant-design/icons";
import ImgContainerCss from "@components/ImgContainerCss";
import Layout from "@components/Layout";
import Loading from "@components/Loading";
import NextSeoHeader from "@components/NextSeoHeader";
import IPost from "@data/IPost";
import siteJson from "@data/site.json";
import Container from "@styles/Container";
import { Alert, Breadcrumb, Space } from "antd";
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
          <TitleSubtituloCss type="secondary" level={5}>
            {post.resumo}
          </TitleSubtituloCss>
          <div>
            <Text>{DateUtils.formatarDataUX({ data: post.updatedAt })}</Text>
          </div>
          <hr />

          <div>
            {imgExibicao && (
              <ImgContainerPostCss>
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={imgExibicao?.[0].url.md}
                  alt={post.titulo}
                />
              </ImgContainerPostCss>
            )}
            <TextCorpoNoticiaCss>
              <span
                dangerouslySetInnerHTML={{
                  __html: post.conteudo,
                }}
              ></span>
            </TextCorpoNoticiaCss>
            <Alert
              message="Informe"
              description={
                <>
                  {siteJson.fraseFinalPosts}.{" "}
                  <a target="_blank" href={post.fonteOriginal} rel="noreferrer">
                    Clique aqui para ver a notícia original.
                  </a>
                </>
              }
              type="info"
              showIcon
            />
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
  margin-left: 20px;

  @media only screen and (max-width: 900px) {
    float: none;
    margin: 10px auto;
    width: 300px;
    height: 200px;
  }
`;

const TitleSubtituloCss = styled(Title)`
  font-size: 1.4em !important;
`;

const TextCorpoNoticiaCss = styled(Text)`
  font-family: opensans, helvetica, arial, sans-serif;
  font-size: 1.25rem;
  line-height: 2rem;
  margin-bottom: 2rem;
  overflow-wrap: break-word;
  color: #333;
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
