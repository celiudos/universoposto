import Navbar from "@components/Navbar";
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

export default function Home() {
  return (
    <div className="layout">
      <Navbar />
    </div>
  );
  // return (
  //   <Layout>
  //     <Header>
  //       <Navbar />
  //     </Header>
  //     <Layout>
  //       <Content>Content</Content>
  //       <Sider>Sider</Sider>
  //     </Layout>
  //     <Footer>Footer</Footer>
  //   </Layout>
  // );
}
