import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default class DateUtils {
  static formatarDataUX({ data = "", formato = "PPPP" }) {
    try {
      return format(new Date(parseInt(data)), formato, {
        locale: ptBR,
      });
    } catch (error) {
      console.log("Erro no formatarDataUX:", data, error);
      return "-";
    }
  }
}
