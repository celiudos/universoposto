import { HomeOutlined } from "@ant-design/icons";
import Layout from "@components/Layout";
import categoriasMock from "@data/categorias.json";
import ICategoria from "@data/ICategoria";
import IPost from "@data/IPost";
import postsMock from "@data/posts.json";
import Container from "@styles/Container";
import { Breadcrumb, Space, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { useRouter } from "next/dist/client/router";
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

  return (
    <Layout>
      <Container>
        <Space size="small" direction="vertical">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href={`/post/${post.cat?.slug}`}>
              <span>{post.cat?.titulo}</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Publicação</Breadcrumb.Item>
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
    slugPost: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const categorias = categoriasMock as ICategoria[];

  let post = postsMock.filter((p) => p.slug === params.slugPost)[0] as IPost;

  post = { ...post, cat: categorias.filter((c) => c.id === post.catId)[0] };

  return {
    props: { post },
  };
}
