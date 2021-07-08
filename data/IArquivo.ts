import IFirebase from "./IFirebase";

interface IArquivo extends IFirebase {
  isImagem: boolean;
  url: {
    md: string;
    sm: string;
    xs: string;
  };
  tipo: string;
  name: string;
}

export default IArquivo;
