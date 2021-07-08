import IFirebase from "./IFirebase";

interface IPagina extends IFirebase {
  conteudo: string;
  galeria: any[];
  titulo: string;
}
export default IPagina;
