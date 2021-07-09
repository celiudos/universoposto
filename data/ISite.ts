interface ISite {
  site: string;
  titulo: string;
  subtitulo: string;
  email: string;
}

interface ICoresCategorias {
  [key: string]: ICores;
}

interface ICores {
  nome: string;
  cor: string;
}

export default ISite;
export type { ICoresCategorias };
