import styled from "styled-components";

export default function LogoEmTxt() {
  return (
    <TituloContainerCss className="txtLogo">
      <TituloCss>
        <span className="a">Universo</span>
        <span className="b">Oposto</span>
      </TituloCss>
      <ContainerSetasCss className="animate__animated animate__rotateIn">
        <Arrow tipo="cima" />
        <Arrow />
      </ContainerSetasCss>
    </TituloContainerCss>
  );
}

const TituloContainerCss = styled.div`
  position: relative;
  height: 60px;
  width: 460px;
  text-align: center;

  @media only screen and (max-width: 900px) {
    width: 260px;
  }
`;

const TituloCss = styled.h1`
  line-height: 100%;
  margin: 0;
  font-family: sans-serif;
  font-size: 50px;
  letter-spacing: 2px;
  color: #a7cbeb;
  .a {
    margin-right: 30px;
    -webkit-text-stroke: 2px #9175c1;
  }
  .b {
    -webkit-text-stroke: 2px #3f51b5;
  }

  @media only screen and (max-width: 900px) {
    font-size: 30px;
  }
`;

function Arrow({ tipo = "baixo" }) {
  let params = {
    scale: 1.5,
    tamanho: 24,
    rotate: 45,
    stroke: "#9175c1",
    fill: "#5326a2",
  };

  if (tipo === "cima") {
    params = {
      ...params,
      stroke: "#3f51b5",
      fill: "#19287d",
      rotate: 225,
    };
  }

  return (
    <svg
      className={tipo}
      xmlns="http://www.w3.org/2000/svg"
      width={params.tamanho}
      height={params.tamanho}
      viewBox={`0 0 ${params.tamanho} ${params.tamanho}`}
      strokeWidth="2"
      stroke={params.stroke}
      fill={params.fill}
      transform={`rotate(${params.rotate}) scale(${params.scale})`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-8a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1z"></path>
    </svg>
  );
}

const ContainerSetasCss = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  width: 40px;
  height: 100%;

  svg {
    position: absolute;
    left: 8px;
    top: 3px;
  }

  svg.baixo {
    top: 28px;
  }

  @media only screen and (max-width: 900px) {
    svg {
      top: -5px;
    }

    svg.baixo {
      top: 20px;
    }
  }
`;
