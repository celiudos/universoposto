import Navbar from "@components/Navbar";
import PostDestaque from "@components/PostDestaque";
import Container from "@styles/Container";
import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <Navbar />
      <CorpoCss>
        <PostDestaque />
      </CorpoCss>
    </Container>
  );
}

const CorpoCss = styled.div`
  margin: 50px 0 0 0;
`;
