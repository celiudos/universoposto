import ICategoria from "./ICategoria";

interface IPost {
  titulo: string;
  subtitulo: string;
  resumo: string;
  slug: string;
  id: string;
  catId: number;
  cat?: ICategoria;
  autor: string;
  conteudo: string;
  data: number;
}

export default IPost;
