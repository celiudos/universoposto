interface PesquisarInterface {
  total: number;
  termo: string;
  limite: number;
  qntPaginas: number;
  pagina: number;
  resultados: any[];
}

interface ReduxState {
  resultadoPesquisar: PesquisarInterface;
}

let stateInicial: ReduxState = {
  resultadoPesquisar: {
    total: 0,
    termo: "",
    limite: 0,
    qntPaginas: 0,
    pagina: 0,
    resultados: [],
  },
};

export default function rootReducer(
  state = stateInicial,
  action: any
): ReduxState {
  state = {
    ...state,
  };

  switch (action.type) {
    //novo
    case "RESULTADO_PESQUISAR":
      return {
        ...state,
        resultadoPesquisar: action.valor,
      };
    default:
      return state;
  }
}
