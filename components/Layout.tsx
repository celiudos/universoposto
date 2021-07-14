import Footer from "@components/Footer";
import styled from "styled-components";
import BgEstrelas from "./layout/BgEstrelas";
import Logo from "./layout/Logo";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <MainCss>
      <BgEstrelas />
      <Logo />
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
  margin: 70px 0;

  @media only screen and (max-width: 900px) {
    margin: 20px 0;
  }
`;
