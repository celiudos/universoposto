import { HomeOutlined } from "@ant-design/icons";
import Layout from "@components/Layout";
import Loading from "@components/Loading";
import NextSeoHeader from "@components/NextSeoHeader";
import IPagina from "@data/IPagina";
import Container from "@styles/Container";
import { Breadcrumb, Space } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import FirestoreApi from "firebase/FirebaseApi";
import { useRouter } from "next/dist/client/router";
import DateUtils from "utils/DateUtils";

type Props = {
  pagina: IPagina;
};

export default function Pagina({ pagina }: Props) {
  const router = useRouter();

  if (router.isFallback) return <Loading />;

  if (!pagina) return null;

  return (
    <Layout>
      <NextSeoHeader title={pagina?.titulo} description="Página" />
      <Container>
        <Space size="small" direction="vertical">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Página</Breadcrumb.Item>
          </Breadcrumb>

          <Title>{pagina?.titulo}</Title>
          <div>
            <Text>{DateUtils.formatarDataUX({ data: pagina.updatedAt })}</Text>
          </div>
          <hr />

          <Text>
            <div
              dangerouslySetInnerHTML={{
                __html: pagina.conteudo,
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

export const getStaticProps = async ({ params }: Params) => {
  const fb = new FirestoreApi();
  let pagina = (await fb.getDocBySlug("paginas", params.slugPage)) as IPagina;

  return {
    props: { pagina },
  };
};
