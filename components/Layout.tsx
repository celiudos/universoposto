import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <MainCss>
      <Navbar />
      <CorpoCss>{children}</CorpoCss>
      <Footer />
    </MainCss>
  );
}

const MainCss = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;

const CorpoCss = styled.section`
  flex: 1;
  margin: 30px 0;
`;
