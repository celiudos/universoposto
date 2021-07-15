import { Card } from "antd";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const { Meta } = Card;

export default function CardsSobre() {
  return (
    <MainCss>
      <Card
        className="animate__animated animate__delay-1s"
        style={{ width: 300 }}
        cover={
          <Image
            layout="fixed"
            src={"/img/sobre/undraw_education.svg"}
            alt="Educacional"
            width={300}
            height={200}
          />
        }
      >
        <Meta
          title="Educacional"
          description="Aprenda a diferenciar notícia falsa da notícia verdadeira"
        />
      </Card>
      <Card
        className="animate__animated animate__delay-2s"
        style={{ width: 300 }}
        cover={
          <Image
            layout="fixed"
            src={"/img/sobre/undraw_relaxing.svg"}
            alt="Relaxante"
            width={300}
            height={200}
          />
        }
      >
        <Meta
          title="Relaxante"
          description="Uma visão fictícia de um mundo ideal serve como fuga para as notícias do dia a dia"
        />
      </Card>
      <Card
        className="animate__animated animate__delay-3s"
        style={{ width: 300 }}
        cover={
          <Image
            layout="fixed"
            src={"/img/sobre/undraw_smiley.svg"}
            alt="Divertido"
            width={300}
            height={200}
          />
        }
      >
        <Meta
          title="Divertido"
          description="Aqui a notícia é encarada com humor"
        />
      </Card>
    </MainCss>
  );
}

export const MainCss = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  > div.ant-card {
    animation-name: slideInUp;
    margin-right: 20px;
  }

  @media only screen and (max-width: 900px) {
    flex-direction: column;
    > div.ant-card {
      margin-right: 0;
      margin-bottom: 20px;
      animation-name: slideInLeft;
    }
  }
`;
