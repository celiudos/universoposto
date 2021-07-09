import { ICoresCategorias } from "@data/ISite";
import styled from "styled-components";

const categoriasCores: ICoresCategorias = {
  "183sUJNy8t1wflwRpNEw": {
    nome: "satira",
    cor: "#2196f3",
  },
  KE5p1E8Z8kgQgfcn3dMu: {
    nome: "famosos",
    cor: "#ff9800",
  },
  b6Gu76GyRF2thsEgQHqC: {
    nome: "esporte",
    cor: "#4caf50",
  },
  jigBFegZEWvmUYR01l2a: {
    nome: "politica",
    cor: "#f44336",
  },
};

const CoresCategorias = styled.span`
  color: ${(props: { catId: string }) => categoriasCores[props.catId].cor};
`;

export default CoresCategorias;
