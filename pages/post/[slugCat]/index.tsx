import { HomeOutlined } from "@ant-design/icons";
import Layout from "@components/Layout";
import LinkPostECat from "@components/LinkPostECat";
import categoriasMock from "@data/categorias.json";
import ICategoria from "@data/ICategoria";
import IPost from "@data/IPost";
import postsMock from "@data/posts.json";
import Container from "@styles/Container";
import { Breadcrumb, List, Space, Spin } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { useRouter } from "next/dist/client/router";

type Props = {
  categoria: ICategoria;
  posts: IPost[];
};

export default function Categoria({ categoria, posts }: Props) {
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
            <Breadcrumb.Item>Categoria</Breadcrumb.Item>
          </Breadcrumb>

          <Title>{categoria.titulo}</Title>
        </Space>
        <hr />

        <List
          itemLayout="horizontal"
          dataSource={posts}
          renderItem={(post) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <LinkPostECat catSlug={post.cat?.slug} postSlug={post.slug}>
                    <Avatar src={"/img/img1.png"} />
                  </LinkPostECat>
                }
                title={
                  <LinkPostECat catSlug={post.cat?.slug} postSlug={post.slug}>
                    <a>
                      <Text>{post.titulo}</Text>
                    </a>
                  </LinkPostECat>
                }
                description={
                  <LinkPostECat catSlug={post.cat?.slug} postSlug={post.slug}>
                    <a>
                      <Text>{post.resumo}</Text>
                    </a>
                  </LinkPostECat>
                }
              />
            </List.Item>
          )}
        />
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
    slugCat: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const categoria = categoriasMock.filter(
    (p) => p.slug === params.slugCat
  )[0] as ICategoria;

  const posts = postsMock.filter((p) => p.catId === categoria.id) as IPost[];

  return {
    props: { categoria, posts },
  };
}
