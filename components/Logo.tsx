import Image from "next/image";
import styled from "styled-components";
import LogoImg from "../public/logo/logo-grande.png";

export default function Logo(): JSX.Element {
  return (
    <LogoCss>
      <Image src={LogoImg} alt="Universo Oposto" />
      <em className="subtitulo">Onde o contrário poderia ser bom</em>
    </LogoCss>
  );
}

const LogoCss = styled.div`
  em {
    display: block;
  }
`;
