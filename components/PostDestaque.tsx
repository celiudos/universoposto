import Img1 from "@public/img/img1.png";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

export default function PostDestaque(): JSX.Element {
  return (
    <PostDestaqueCss>
      <ImgCss>
        <Image layout="fixed" src={Img1} alt="Img1" height={300} width={400} />
      </ImgCss>
      <ConteudoCss>
        <Title>
          CPI: servidora diz que contrato da Covaxin ficou sem fiscal por 1 mês
        </Title>
        <Text>
          Regina Célia só foi nomeada dois dias após irmãos Miranda denunciarem
          irregularidade ao presidente Jair Bolsonaro
        </Text>
      </ConteudoCss>
    </PostDestaqueCss>
  );
}

const PostDestaqueCss = styled.div`
  display: flex;
  /* width: 800px; */
`;

const ImgCss = styled.div`
  width: 400px;
`;

const ConteudoCss = styled.div`
  padding: 0 0 0 30px;
`;
