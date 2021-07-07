import { HomeOutlined } from "@ant-design/icons";
import Layout from "@components/Layout";
import IPost from "@data/IPost";
import pagesMock from "@data/pages.json";
import Container from "@styles/Container";
import { Breadcrumb, Space, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { useRouter } from "next/dist/client/router";
import DateUtils from "utils/DateUtils";

type Props = {
  post: IPost;
};

export default function Pagina({ post }: Props) {
  const router = useRouter();

  if (router.isFallback)
    return (
      <Layout>
        <Container>
          <Spin />
        </Container>
      </Layout>
    );

  return (
    <Layout>
      <Container>
        <Space size="small" direction="vertical">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Página</Breadcrumb.Item>
          </Breadcrumb>

          <Title>{post.titulo}</Title>
          <Text type="secondary">{post.resumo}</Text>
          <div>
            <Text>{DateUtils.formatarDataUX({ data: post.data })}</Text>
          </div>
          <hr />
          <Text>
            <div
              dangerouslySetInnerHTML={{
                __html: post.conteudo,
              }}
            ></div>
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
    slugPage: string;
  };
};

export async function getStaticProps({ params }: Params) {
  let post = pagesMock.filter((p) => p.slug === params.slugPage)[0] as IPost;
  return {
    props: { post },
  };
}
