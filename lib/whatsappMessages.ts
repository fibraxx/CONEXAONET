// src/lib/whatsappMessages.ts
// ConexãoNet — mensagens de WhatsApp por botão/ação

// Número padrão do WhatsApp (somente dígitos, com DDI)
export const WAPP = "5533984104073"

// Utilitário para criar o link wa.me com o texto já codificado
export function waLink(message: string, phone: string = WAPP): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

// ==== Tipagens úteis (opcionais) ====
export type Turno = "manhã" | "tarde" | "noite"
export interface BaseInfo {
  nome: string
  cpf: string
  telefone: string
  endereco: string
}
export interface InstalacaoInfo extends BaseInfo {
  dataTurno: string // ex: "12/11 à tarde"
  turno?: Turno
}
export interface UpgradeInfo {
  cpf: string
  telefone?: string
  planoAtual?: string
  novoPlano?: string
  horario?: string
}
export interface TVInfo {
  cpf: string
  jaCliente?: "sim" | "não"
  tituloInteresse?: string // para dúvidas do catálogo
}
export interface FinanceiroInfo {
  documento: string // CPF/CNPJ
  data?: string // vencimento desejado
}
export interface MudancaInfo {
  enderecoAtual: string
  enderecoNovo: string
  data: string
}

// ==== Mensagens por ação ====
export const Messages = {
  // ---- ASSINATURA DE PLANOS ----
  assinar40: (p: InstalacaoInfo) =>
    `
Me interessei pelo plano 40 Mb (R$ 69,90/mês) e gostaria de assinar.
Nome: ${p.nome} | CPF: ${p.cpf}
Endereço completo: ${p.endereco}
Melhor dia/turno para instalação: ${p.dataTurno}
Telefone/WhatsApp: ${p.telefone}`.trim(),

  assinar100: (p: InstalacaoInfo) =>
    `
Quero contratar o plano 100 Mb (R$ 79,90/mês) que vi no site.
Nome: ${p.nome} | CPF: ${p.cpf}
Endereço: ${p.endereco}
Preferência de instalação: ${p.dataTurno}
Contato: ${p.telefone}`.trim(),

  assinar200: (p: InstalacaoInfo) =>
    `
Escolhi o plano 200 Mb (R$ 89,90/mês) e desejo seguir com a assinatura.
Titular: ${p.nome} | CPF: ${p.cpf}
Endereço: ${p.endereco}
Horário preferido (manhã/tarde): ${p.turno ?? "manhã/tarde"}
Telefone: ${p.telefone}`.trim(),

  assinar500: (p: InstalacaoInfo) =>
    `
Decidi pelo plano 500 Mb (R$ 99,90/mês) e quero fechar a instalação.
Nome: ${p.nome} | CPF: ${p.cpf}
Endereço: ${p.endereco}
Data/turno desejado: ${p.dataTurno}
Telefone/WhatsApp: ${p.telefone}`.trim(),

  assinar600: (p: InstalacaoInfo & { wifi6?: "sim" | "não" }) =>
    `
Me interessei pelo plano 600 Mb (R$ 129,90/mês) e gostaria de assinar.
Nome: ${p.nome} | CPF: ${p.cpf}
Endereço: ${p.endereco}
Preciso de roteador Wi-Fi 6 em comodato? ${p.wifi6 ?? "sim"}
Data/turno para instalação: ${p.dataTurno}
Telefone: ${p.telefone}`.trim(),

  assinar750: (p: InstalacaoInfo) =>
    `
Tenho interesse no plano 750 Mb (R$ 149,90/mês) e quero contratar.
Titular: ${p.nome} | CPF: ${p.cpf}
Endereço: ${p.endereco}
Melhor período para instalação: ${p.turno ?? "manhã/tarde"}
Telefone/WhatsApp: ${p.telefone}`.trim(),

  // ---- UPGRADE / MIGRAÇÃO ----
  upgradeGenerico: (p: UpgradeInfo) =>
    `
Sou cliente ConexãoNet e quero MIGRAR meu plano.
Plano atual: ${p.planoAtual ?? "-"} → Novo plano desejado: ${p.novoPlano ?? "-"}.
CPF: ${p.cpf} ${p.telefone ? `| Telefone: ${p.telefone}` : ""}`.trim(),

  upgrade500: (p: UpgradeInfo) =>
    `
Sou cliente e quero UPGRADE para 500 Mb (R$ 99,90/mês).
CPF: ${p.cpf}${p.telefone ? ` | Telefone: ${p.telefone}` : ""}`.trim(),

  upgrade600: (p: UpgradeInfo) =>
    `
Solicito UPGRADE para 600 Mb (R$ 129,90/mês).
CPF: ${p.cpf}${p.horario ? ` | Melhor horário: ${p.horario}` : ""}`.trim(),

  // ---- CONEXÃONET TV / FILMES ----
  tvAssinar: (p: TVInfo) =>
    `
Quero assinar a ConexãoNetTV (canais ao vivo + catálogo sob demanda).
Já sou cliente de internet? ${p.jaCliente ?? "sim"}
CPF: ${p.cpf}`.trim(),

  tvCombo500: (p: InstalacaoInfo) =>
    `
Quero COMBO 500 Mb + ConexãoNetTV.
Nome: ${p.nome} | Endereço: ${p.endereco}
Data/turno: ${p.dataTurno}`.trim(),

  tvCombo600: (p: InstalacaoInfo) =>
    `
Quero COMBO 600 Mb + ConexãoNetTV.
Nome: ${p.nome} | Endereço: ${p.endereco}
Data/turno: ${p.dataTurno}`.trim(),

  tvDuvidaEmAlta: (p: TVInfo) =>
    `
Vi o catálogo de filmes/séries no site e quero detalhes sobre o ConexãoNetTV.
Tenho interesse em: ${p.tituloInteresse ?? "-"}
CPF: ${p.cpf}`.trim(),

  // ---- COBERTURA / INSTALAÇÃO ----
  cobertura: (p: { nome: string; telefone: string; endereco: string }) =>
    `
Quero verificar COBERTURA.
Endereço completo (com ponto de referência): ${p.endereco}
Nome: ${p.nome} | Telefone: ${p.telefone}`.trim(),

  agendarInstalacao: (p: { plano: string; endereco: string; dataTurno: string; nome?: string }) =>
    `
Quero AGENDAR INSTALAÇÃO.
Plano escolhido: ${p.plano}
Endereço: ${p.endereco}
Data/turno preferido: ${p.dataTurno}${p.nome ? ` | Nome: ${p.nome}` : ""}`.trim(),

  // ---- SUPORTE ----
  suporteQueda: (p: { descricaoLuzes?: string; dados?: string }) =>
    `
Suporte, minha conexão CAIU.
Luzes do equipamento: ${p.descricaoLuzes ?? "-"}
Endereço/CPF: ${p.dados ?? "-"}`.trim(),

  suporteLentidao: (p: { plano?: string; caboOuWifi?: "cabo" | "wifi"; resultado?: string }) =>
    `
Suporte! Estou com lentidão/ping alto.
Plano: ${p.plano ?? "-"} | Teste por: ${p.caboOuWifi ?? "wifi"} | Resultado: ${p.resultado ?? "-"}`.trim(),

  // ---- FINANCEIRO / CONTRATO ----
  segundaVia: (p: FinanceiroInfo) =>
    `
Preciso de 2ª via/boleto.
CPF/CNPJ: ${p.documento}${p.data ? ` | Vencimento: ${p.data}` : ""}`.trim(),

  mudancaEndereco: (p: MudancaInfo & { cpf?: string }) =>
    `
Sou cliente e vou MUDAR DE ENDEREÇO.
Atual: ${p.enderecoAtual} → Novo: ${p.enderecoNovo}
Data da mudança: ${p.data}${p.cpf ? ` | CPF: ${p.cpf}` : ""}`.trim(),

  retiradaOuCancelamento: (p: BaseInfo) =>
    `
Solicito RETIRADA DE EQUIPAMENTO/CANCELAMENTO.
Titular: ${p.nome} | CPF: ${p.cpf}
Endereço: ${p.endereco}`.trim(),
}

// Tipo das chaves de ação
export type ActionKey = keyof typeof Messages

// Builder genérico de mensagem
export function buildMessage<K extends ActionKey>(action: K, payload: Parameters<(typeof Messages)[K]>[0]): string {
  return (Messages[action] as any)(payload)
}

// Link final do WhatsApp para uma ação
export function wa<K extends ActionKey>(
  action: K,
  payload: Parameters<(typeof Messages)[K]>[0],
  phone: string = WAPP,
): string {
  return waLink(buildMessage(action, payload), phone)
}

// Opcional: registry para mapear IDs de botões do site a ações
export const ButtonActions: Record<string, ActionKey> = {
  // Planos
  "btn-assinar-40": "assinar40",
  "btn-assinar-100": "assinar100",
  "btn-assinar-200": "assinar200",
  "btn-assinar-500": "assinar500",
  "btn-assinar-600": "assinar600",
  "btn-assinar-750": "assinar750",

  // Upgrades
  "btn-upgrade-generico": "upgradeGenerico",
  "btn-upgrade-500": "upgrade500",
  "btn-upgrade-600": "upgrade600",

  // TV
  "btn-tv-assinar": "tvAssinar",
  "btn-tv-combo-500": "tvCombo500",
  "btn-tv-combo-600": "tvCombo600",
  "btn-tv-em-alta-duvida": "tvDuvidaEmAlta",

  // Cobertura/Instalação
  "btn-cobertura": "cobertura",
  "btn-agendar-instalacao": "agendarInstalacao",

  // Suporte
  "btn-suporte-queda": "suporteQueda",
  "btn-suporte-lentidao": "suporteLentidao",

  // Financeiro/Contrato
  "btn-segunda-via": "segundaVia",
  "btn-mudanca-endereco": "mudancaEndereco",
  "btn-retirada-cancelamento": "retiradaOuCancelamento",
}
