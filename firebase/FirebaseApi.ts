import IArquivo from "@data/IArquivo";
import ICategoria from "@data/ICategoria";
import { TFirebaseId } from "@data/IFirebase";
import DateUtils from "@utils/DateUtils";
import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "./firebaseInit";

type TGetPosts = {
  catId?: TFirebaseId | false;
  isDestaque?: boolean;
  keysToMerge?: string[];
};

export default class FirestoreApi {
  firebase;

  constructor() {
    this.firebase = initFirebase();
  }

  async getCollection(colecao: string): Promise<{}[]> {
    return new Promise<{}[]>((resolve, reject) => {
      this.firebase
        .firestore()
        .collection(colecao)
        .get()
        .then((querySnapshot) => {
          let dados: {}[] = [];
          querySnapshot.forEach((doc) => {
            dados.push(this.ajustarCorpoJson(doc));
          });
          resolve(dados);
        })
        .catch((error) => {
          reject({ msg: `Error getting document`, error });
        });
    });
  }

  async getDoc(
    colecao: string,
    id: string,
    keysToMerge = ["imgExibicao", "galeria", "catId"]
  ): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      let docRef = this.firebase.firestore().collection(colecao).doc(id);

      docRef
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            let dadosMergeados = await this.formatarDadosJson(
              [doc],
              keysToMerge
            );

            resolve(dadosMergeados[0]);
          } else {
            // doc.data() will be undefined in this case
            reject({ error: "No such document!" });
          }
        })
        .catch((error) => {
          reject({ msg: `Error getting document`, error });
        });
    });
  }

  async getPosts({
    catId,
    isDestaque,
    keysToMerge = ["imgExibicao", "galeria", "catId"],
  }: TGetPosts): Promise<{}[]> {
    return new Promise<{}[]>((resolve, reject) => {
      const firestore = this.firebase.firestore();
      let docRef;

      if (isDestaque !== undefined) {
        docRef = firestore
          .collection("posts")
          .where("isDestaque", "==", isDestaque);
      } else if (catId !== undefined) {
        docRef = firestore.collection("posts").where("catId", "==", catId);
      } else {
        docRef = firestore.collection("posts");
      }

      docRef
        .get()
        .then(async (querySnapshot) => {
          let dadosMergeados = await this.formatarDadosJson(
            querySnapshot,
            keysToMerge
          );

          resolve(dadosMergeados);
        })
        .catch((error) => {
          reject({ msg: `Error getting document`, error });
        });
    });
  }

  async getDocBySlug(
    colecao: string,
    slug: string,
    keysToMerge: string[] = ["imgExibicao", "galeria", "catId"]
  ): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      let docRef = this.firebase
        .firestore()
        .collection(colecao)
        .where("slug", "==", slug);

      docRef
        .get()
        .then(async (querySnapshot) => {
          let dadosMergeados = await this.formatarDadosJson(
            querySnapshot,
            keysToMerge
          );

          resolve(dadosMergeados[0]);
        })
        .catch((error) => {
          reject({ error: `Error getting document: + ${error}` });
        });
    });
  }

  //========== PRIVATE

  private async formatarDadosJson(
    querySnapshot:
      | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
      | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>[],
    keysToMerge: string[]
  ) {
    let dados: {}[] = [];

    querySnapshot.forEach((doc) => {
      dados.push(this.ajustarCorpoJson(doc));
    });

    let dadosMergeados = [];

    for await (const dado of dados) {
      const mergeado = await this.mergeCollections(keysToMerge, dado);
      dadosMergeados.push(mergeado);
    }
    return dadosMergeados;
  }

  private async mergeCollections(
    keysToMerge: string[],
    dado: { [key: string]: any }
  ): Promise<{}> {
    if (keysToMerge.length && dado) {
      for await (const campo of keysToMerge) {
        const firebaseId = dado[campo] as TFirebaseId;

        if (firebaseId && campo === "catId") {
          dado._catId = (await this.getDoc(
            "categorias",
            firebaseId
          )) as ICategoria;
        }

        if (firebaseId && campo === "imgExibicao") {
          for await (const id of dado.imgExibicao) {
            const arquivo = (await this.getDoc("arquivos", id)) as IArquivo;
            if (!dado._imgExibicao) dado._imgExibicao = [];
            dado._imgExibicao.push(arquivo);
          }
        }

        if (firebaseId && campo === "galeria") {
          for await (const id of dado.galeria) {
            const arquivo = (await this.getDoc("arquivos", id)) as IArquivo;
            if (!dado._galeria) dado._galeria = [];
            dado._galeria.push(arquivo);
          }
        }
      }
    }
    return dado;
  }

  private ajustarCorpoJson(
    doc:
      | firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
      | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ): {} {
    const dadosJson = doc.data();
    return {
      ...dadosJson,
      updatedAt: DateUtils.getDateFirebase(dadosJson?.updatedAt),
      createdAt: DateUtils.getDateFirebase(dadosJson?.createdAt),
      id: doc.id,
    };
  }
}
