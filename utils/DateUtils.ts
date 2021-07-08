import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Props = {
  data: string | number;
  formato?: string;
};

export default class DateUtils {
  static formatarDataUX({ data = "", formato = "PPPP" }: Props): string {
    try {
      if (typeof data === "string") data = parseInt(data);
      return format(new Date(data), formato, {
        locale: ptBR,
      });
    } catch (error) {
      console.log("Erro no formatarDataUX:", data, error);
      return "-";
    }
  }

  static getDateFirebase = (
    dataFirebase:
      | {
          seconds: number | undefined;
          nanoseconds: number | undefined;
        }
      | undefined
  ): number => {
    if (!dataFirebase) {
      console.error("Erro getDateFirebase: não há dado presente", dataFirebase);
      return new Date().getTime();
    }

    if (
      dataFirebase.seconds === undefined ||
      dataFirebase.nanoseconds === undefined
    ) {
      return new Date().getTime();
    } else {
      return dataFirebase.seconds * 1000 + dataFirebase.nanoseconds / 1000000;
    }
  };
}
