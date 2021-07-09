import { HomeOutlined } from "@ant-design/icons";
import ImgContainerCss from "@components/ImgContainerCss";
import Layout from "@components/Layout";
import NextSeoHeader from "@components/NextSeoHeader";
import IPost from "@data/IPost";
import Container from "@styles/Container";
import { Breadcrumb, Space, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import FirestoreApi from "firebase/FirebaseApi";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import DateUtils from "utils/DateUtils";

type Props = {
  post: IPost;
};

export default function Post({ post }: Props) {
  const router = useRouter();

  if (router.isFallback)
    return (
      <Layout>
        <Container>
          <Spin />
        </Container>
      </Layout>
    );

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

          {imgExibicao && (
            <ImgContainerCss
              style={{ width: 600, height: 400, margin: "auto" }}
            >
              <Image
                layout="fill"
                src={imgExibicao?.[0].url.md}
                alt={post.titulo}
              />
            </ImgContainerCss>
          )}
          <Text>
            <span
              dangerouslySetInnerHTML={{
                __html: post.conteudo,
              }}
            ></span>
          </Text>
        </Space>
      </Container>
    </Layout>
  );
}

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
