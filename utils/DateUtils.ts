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
}
