import { HomeOutlined } from "@ant-design/icons";
import Layout from "@components/Layout";
import LinkPostECat from "@components/LinkPostECat";
import NextSeoHeader from "@components/NextSeoHeader";
import ICategoria from "@data/ICategoria";
import IPost from "@data/IPost";
import Container from "@styles/Container";
import CoresCategorias from "@styles/CoresCategorias";
import { Breadcrumb, List, Space, Spin } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import FirestoreApi from "firebase/FirebaseApi";
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
      <NextSeoHeader title={categoria.titulo} description={"Categoria"} />
      <Container>
        <Space size="small" direction="vertical">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Categoria</Breadcrumb.Item>
          </Breadcrumb>

          <Title>
            <CoresCategorias catId={categoria.id}>
              {categoria.titulo}
            </CoresCategorias>
          </Title>
        </Space>
        <hr />

        <List
          itemLayout="horizontal"
          dataSource={posts}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          renderItem={(post) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <LinkPostECat
                    catSlug={post._catId?.slug}
                    postSlug={post.slug}
                  >
                    <Avatar src={"/img/img1.png"} />
                  </LinkPostECat>
                }
                title={
                  <LinkPostECat
                    catSlug={post._catId?.slug}
                    postSlug={post.slug}
                  >
                    <Text>{post.titulo}</Text>
                  </LinkPostECat>
                }
                description={
                  <LinkPostECat
                    catSlug={post._catId?.slug}
                    postSlug={post.slug}
                  >
                    <Text>{post.resumo}</Text>
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
  const fb = new FirestoreApi();

  const categoria = (await fb.getDocBySlug(
    "categorias",
    params.slugCat
  )) as ICategoria;

  const posts = (await fb.getPosts({
    catId: categoria.id,
  })) as IPost[];

  return {
    props: { categoria, posts },
  };
}
