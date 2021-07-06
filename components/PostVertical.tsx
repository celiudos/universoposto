import Img2 from "@public/img/img2.png";
import Title from "antd/lib/typography/Title";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

type Props = {
  comImg?: boolean;
};

export default function PostVertical({ comImg }: Props): JSX.Element {
  return (
    <PostVerticalCss>
      {comImg && (
        <ImgCss>
          <Image layout="fill" src={Img2} alt="Img1" objectFit="fill" />
        </ImgCss>
      )}
      <ConteudoCss>
        <Title level={4}>
          {"Aziz: 'Empresa que vende de foguete a parafuso'"}
        </Title>
      </ConteudoCss>
    </PostVerticalCss>
  );
}

const PostVerticalCss = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ImgCss = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
`;

const ConteudoCss = styled.div`
  padding: 15px 0;
`;
