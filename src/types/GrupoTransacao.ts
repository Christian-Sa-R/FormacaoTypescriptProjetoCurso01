import { Transacao } from "./Transacao.js";

export type GrupoTransacoes = {
  label: string;
  transacoes: Transacao[];
};
