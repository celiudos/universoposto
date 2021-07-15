import IArquivo from "./IArquivo";
import ICategoria from "./ICategoria";
import IFirebase, { TFirebaseId } from "./IFirebase";

interface IPost extends IFirebase {
  catId: TFirebaseId;
  _catId: ICategoria;
  imgExibicao?: TFirebaseId[];
  _imgExibicao?: IArquivo[];
  galeria?: TFirebaseId[];
  _galeria?: IArquivo[];
  slug: string;
  isDestaque: boolean;
  isAtivo: boolean;
  resumo: string;
  fonteOriginal: string;
  titulo: string;
  conteudo: string;
  publicacao?: number;
}

export default IPost;
