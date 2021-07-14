import styled from "styled-components";

export default function BgEstrelas() {
  return (
    <MainCss>
      <ImageBgCss />
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
  background: url(/img/bg.svg) center top;
`;
