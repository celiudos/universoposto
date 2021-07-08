import IFirebase from "./IFirebase";

interface ICategoria extends IFirebase {
  slug: string;
  titulo: string;
}

export default ICategoria;
