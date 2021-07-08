import IArquivo from "@data/IArquivo";
import ICategoria from "@data/ICategoria";
import { TFirebaseId } from "@data/IFirebase";
import IPost from "@data/IPost";
import DateUtils from "@utils/DateUtils";
import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "./firebaseInit";

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

  async getDoc(colecao: string, id: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      var docRef = this.firebase.firestore().collection(colecao).doc(id);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            resolve(this.ajustarCorpoJson(doc));
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

  async getPostDestaque(
    keysToMerge: string[] = ["imgExibicao", "galeria", "catId"]
  ): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      var docRef = this.firebase
        .firestore()
        .collection("posts")
        .where("isDestaque", "==", true);

      docRef
        .get()
        .then(async (querySnapshot) => {
          let dados: IPost[] = [];

          querySnapshot.forEach((doc) => {
            dados.push(this.ajustarCorpoJson(doc) as IPost);
          });

          const dado = await this.mergeCollections(keysToMerge, dados[0]);
          resolve(dado);
        })
        .catch((error) => {
          reject({ msg: `Error getting document`, error });
        });
    });
  }

  private async mergeCollections(
    keysToMerge: string[],
    dado: { [keysToMerge: string]: any }
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

  // async getPostsComCategoria(colecao: string, slug: string): Promise<{}> {
  //   return new Promise<{}>((resolve, reject) => {
  //     var docRef = this.firebase
  //       .firestore()
  //       .collection(colecao)
  //       .where("slug", "==", slug);

  //     docRef
  //       .get()
  //       .then((querySnapshot) => {
  //         let dados = {};
  //         querySnapshot.forEach((doc) => {
  //           dados = this.ajustarCorpoJson(doc);
  //         });
  //         resolve(dados);
  //       })
  //       .catch((error) => {
  //         reject({ error: `Error getting document: + ${error}` });
  //       });
  //   });
  // }

  async getDocBySlug(colecao: string, slug: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      var docRef = this.firebase
        .firestore()
        .collection(colecao)
        .where("slug", "==", slug);

      docRef
        .get()
        .then((querySnapshot) => {
          let dados = {};

          querySnapshot.forEach((doc) => {
            dados = this.ajustarCorpoJson(doc);
          });

          resolve(dados);
        })
        .catch((error) => {
          reject({ error: `Error getting document: + ${error}` });
        });
    });
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
