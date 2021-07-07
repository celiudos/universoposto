import ISite from "@data/ISite";
import siteMock from "@data/site.json";
import LogoImg from "@public/logo/logo-grande.png";
import Text from "antd/lib/typography/Text";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function Logo(): JSX.Element {
  const { titulo, subtitulo } = siteMock as ISite;

  return (
    <Link href={"/"} passHref>
      <a>
        <LogoCss>
          <Image src={LogoImg} alt={titulo} />
          <Text>
            <em className="subtitulo">{subtitulo}</em>
          </Text>
        </LogoCss>
      </a>
    </Link>
  );
}

const LogoCss = styled.div`
  em {
    display: block;
  }
`;
