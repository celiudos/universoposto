import { ICoresCategorias } from "@data/ISite";
import styled from "styled-components";

const categoriasCores: ICoresCategorias = {
  "183sUJNy8t1wflwRpNEw": {
    nome: "satira",
    cor: "blue",
  },
  KE5p1E8Z8kgQgfcn3dMu: {
    nome: "famosos",
    cor: "orange",
  },
  b6Gu76GyRF2thsEgQHqC: {
    nome: "esporte",
    cor: "green",
  },
  jigBFegZEWvmUYR01l2a: {
    nome: "politica",
    cor: "red",
  },
};

const CoresCategorias = styled.span`
  color: ${(props: { catId: string }) => categoriasCores[props.catId].cor};
`;

export default CoresCategorias;
