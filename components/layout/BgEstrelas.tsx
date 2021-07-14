import Image from "next/image";
import styled from "styled-components";
import bg from "./bg.svg";

export default function BgEstrelas() {
  return (
    <MainCss>
      <ImageBgCss>
        <Image src={bg} alt="Icone" />
      </ImageBgCss>
    </MainCss>
  );
}

const MainCss = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 180px;
  z-index: 0;
`;

const ImageBgCss = styled.div`
  transform: rotate(180deg);
  position: absolute;
  top: 0;
  width: 100%;
  height: 120%;
`;
