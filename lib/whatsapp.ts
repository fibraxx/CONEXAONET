// WhatsApp utility functions with tracking tags

export const WAPP = "5533984104073"

export const waLink = (text: string) => `https://wa.me/${WAPP}?text=${encodeURIComponent(text)}`

// Plan subscription CTAs
export const waCTAs = {
  // Plan subscriptions
  plan40: () =>
    waLink(
      `Olá! Quero assinar a ConexãoNet. Plano: 40 Mb (R$ 69,90/mês).\nEndereço completo: {{rua}}, {{número}}, {{bairro}}, {{cidade}}.\nCPF: {{cpf}} | Nome: {{nome}} | Instalação preferida: {{data}}.\n[Origem: Site ConexaoNet-PP • Botão ASSINAR 40]`,
    ),
  plan100: () =>
    waLink(
      `Olá! Escolhi o plano 100 Mb (R$ 79,90/mês).\nEndereço: {{endereço}} | Nome: {{nome}} | CPF: {{cpf}}.\nPreferência de instalação: {{data}}.\n[Origem: Site • ASSINAR 100]`,
    ),
  plan200: () =>
    waLink(
      `Olá! Quero contratar o 200 Mb (R$ 89,90/mês).\nEndereço: {{endereço}} | Contato: {{telefone}}.\nPosso receber ligação hoje? {{sim_nao}}\n[Origem: Site • ASSINAR 200]`,
    ),
  plan500: () =>
    waLink(
      `Olá! Quero o 500 Mb (R$ 99,90/mês) com instalação gratuita.\nEndereço: {{endereço}} | Nome: {{nome}} | CPF: {{cpf}}.\nAutorizo contato por WhatsApp.\n[Origem: Site • ASSINAR 500]`,
    ),
  plan600: () =>
    waLink(
      `Oi, equipe ConexãoNet! Fechei com o 600 Mb (R$ 129,90/mês).\nEndereço: {{endereço}} | Preferência: {{data_horário}}.\nPreciso de roteador Wi-Fi 6: {{sim_nao}}\n[Origem: Site • ASSINAR 600]`,
    ),
  plan750: () =>
    waLink(
      `Olá! Quero o 750 Mb (R$ 149,90/mês).\nEndereço: {{endereço}} | Nome: {{nome}} | CPF: {{cpf}}.\nInstalação no período: {{manhã_tarde}}.\n[Origem: Site • ASSINAR 750]`,
    ),

  // Upgrades
  upgrade: () =>
    waLink(
      `Olá! Sou cliente ConexãoNet e quero MIGRAR meu plano atual.\nPlano atual: {{plano_atual}} → Novo plano desejado: {{novo_plano}}.\nNome: {{nome}} | CPF: {{cpf}}.\n[Origem: Site • UPGRADE]`,
    ),
  upgrade500: () =>
    waLink(
      `Oi! Sou cliente e quero UPGRADE para 500 Mb (R$ 99,90/mês).\nContrato/CPF: {{cpf}} | Telefone: {{telefone}}.\n[Origem: Site • UPGRADE 500]`,
    ),
  upgrade600: () =>
    waLink(
      `Oi! Solicito UPGRADE para 600 Mb (R$ 129,90/mês).\nCPF: {{cpf}} | Melhor horário p/ contato: {{horário}}.\n[Origem: Site • UPGRADE 600]`,
    ),

  // ConexãoNetTV
  tvSubscribe: () =>
    waLink(
      `Olá! Quero assinar a ConexãoNetTV (canais ao vivo + catálogo VOD).\nJá sou cliente de internet? {{sim_nao}} | CPF: {{cpf}}.\n[Origem: Site • TV • ASSINAR]`,
    ),
  tvCombo500: () =>
    waLink(
      `Olá! Quero COMBO 500 Mb + ConexãoNetTV.\nEndereço: {{endereço}} | Nome: {{nome}}.\n[Origem: Site • TV • COMBO 500]`,
    ),
  tvCombo600: () =>
    waLink(`Olá! Quero COMBO 600 Mb + ConexãoNetTV.\nPrefiro instalar em: {{data}}.\n[Origem: Site • TV • COMBO 600]`),
  tvCatalog: () =>
    waLink(
      `Oi! Vi o catálogo de filmes/séries no site e quero detalhes sobre o ConexãoNetTV.\nTenho interesse em: {{título}}.\n[Origem: Site • TV • EM ALTA]`,
    ),

  // Coverage & Installation
  coverage: () =>
    waLink(
      `Olá! Quero verificar COBERTURA.\nEndereço completo (com ponto de referência): {{endereço}}.\nNome: {{nome}} | Telefone: {{telefone}}.\n[Origem: Site • COBERTURA]`,
    ),
  scheduleInstall: () =>
    waLink(
      `Olá! Quero AGENDAR INSTALAÇÃO.\nPlano escolhido: {{plano}} | Endereço: {{endereço}}.\nData/turno preferido: {{data_turno}}.\n[Origem: Site • AGENDAR]`,
    ),

  // Support
  supportNoConnection: () =>
    waLink(
      `Suporte, minha conexão CAIU. Luzes do equipamento: {{descrição}}.\nEndereço/CPF: {{dados}}.\n[Origem: Site • SUPORTE • Sem conexão]`,
    ),
  supportSlow: () =>
    waLink(
      `Suporte! Lentidão/Ping alto.\nPlano: {{plano}} | Teste feito por cabo/wifi: {{cabo_ou_wifi}} | Resultado: {{Mbps}}.\n[Origem: Site • SUPORTE • Desempenho]`,
    ),
  secondInvoice: () =>
    waLink(
      `Olá! Preciso de 2ª via/boleto.\nCPF/CNPJ: {{documento}} | Vencimento: {{data}}.\n[Origem: Site • FINANCEIRO]`,
    ),
  changeAddress: () =>
    waLink(
      `Oi! Sou cliente e vou MUDAR DE ENDEREÇO.\nAtual: {{endereço_atual}} → Novo: {{endereço_novo}} | Data da mudança: {{data}}.\n[Origem: Site • SUPORTE • Mudança]`,
    ),
  cancelService: () =>
    waLink(
      `Olá! Solicito RETIRADA DE EQUIPAMENTO/CANCELAMENTO.\nTitular: {{nome}} | CPF: {{cpf}} | Endereço: {{endereço}}.\n[Origem: Site • SUPORTE • Retirada]`,
    ),

  // Generic
  generic: () => waLink(`Olá! Quero assinar a ConexãoNet.\n[Origem: Site • Geral]`),
}
