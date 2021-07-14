import { HomeOutlined } from "@ant-design/icons";
import ImgContainerCss from "@components/ImgContainerCss";
import Layout from "@components/Layout";
import LinkPostECat from "@components/LinkPostECat";
import Loading from "@components/Loading";
import NextSeoHeader from "@components/NextSeoHeader";
import ICategoria from "@data/ICategoria";
import IPost from "@data/IPost";
import Container from "@styles/Container";
import CoresCategorias from "@styles/CoresCategorias";
import { Breadcrumb, List, Space } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import FirestoreApi from "firebase/FirebaseApi";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";

type Props = {
  categoria: ICategoria;
  posts: IPost[];
};

export default function Categoria({ categoria, posts }: Props) {
  const router = useRouter();

  if (router.isFallback) return <Loading />;

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
          size="large"
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
                  post._imgExibicao ? (
                    <LinkPostECat
                      catSlug={post._catId?.slug}
                      postSlug={post.slug}
                    >
                      <ImgContainerCss style={{ width: 120, height: 80 }}>
                        <Image
                          layout="fill"
                          src={post._imgExibicao?.[0].url.sm}
                          alt={post.titulo}
                        />
                      </ImgContainerCss>
                    </LinkPostECat>
                  ) : null
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

  const tamanhoIdFirebase = 20;

  if (
    typeof params.slugCat === "string" &&
    params.slugCat.length === tamanhoIdFirebase
  ) {
    const post = (await fb.getDoc("posts", params.slugCat)) as IPost;

    return {
      redirect: {
        permanent: false,
        destination: `/post/${post._catId.slug}/${post.slug}`,
      },
    };
  }

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
