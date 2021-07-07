import LogoImg from "@public/logo/logo-grande.png";
import Text from "antd/lib/typography/Text";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function Logo(): JSX.Element {
  return (
    <Link href={"/"} passHref>
      <a>
        <LogoCss>
          <Image src={LogoImg} alt="Universo Oposto" />
          <Text>
            <em className="subtitulo">Onde o contrário poderia ser bom</em>
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
