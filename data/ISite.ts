interface ISite {
  site: string;
  titulo: string;
  subtitulo: string;
  fraseFinal: string;
  fraseFinalPosts: string;
  email: string;
  isMock: boolean;
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
