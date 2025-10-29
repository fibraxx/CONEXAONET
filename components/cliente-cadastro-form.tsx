"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// --- UI (shadcn) ---
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// --- CONFIG SITE ---
const WAPP = "5533984104073" // WhatsApp ConexãoNet

// --- Máscaras simples BR ---
const onlyDigits = (v: string) => v.replace(/\D/g, "")
const maskCpf = (v: string) =>
  onlyDigits(v)
    .slice(0, 11)
    .replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (_, a, b, c, d) => (d ? `${a}.${b}.${c}-${d}` : `${a}.${b}.${c}`))
const maskCnpj = (v: string) =>
  onlyDigits(v)
    .slice(0, 14)
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, (_, a, b, c, d, e) =>
      e ? `${a}.${b}.${c}/${d}-${e}` : `${a}.${b}.${c}/${d}`,
    )
const maskPhone = (v: string) =>
  onlyDigits(v)
    .slice(0, 11)
    .replace(/(\d{2})(\d{0,5})(\d{0,4})/, (_, a, b, c) => (c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : `(${a}`))

// --- Schema/validação ---
const base = {
  plano: z.enum(["40mb", "200mb", "500mb", "750mb"], { required_error: "Escolha um plano" }),
  telefone1: z.string().min(10, "Telefone obrigatório"),
  telefone2: z.string().optional(),
  email: z.string().email("E-mail inválido"),
  bairro: z.string().min(2, "Bairro obrigatório"),
  rua: z.string().min(2, "Rua obrigatória"),
  numero: z.string().min(1, "Número obrigatório"),
  complemento: z.string().optional(),
  referencia: z.string().optional(),
  vencimento: z.enum(["5", "10", "15", "20"], { required_error: "Escolha a data de vencimento" }),
  disponibilidade: z.enum(["Manhã", "Tarde", "Noite"], { required_error: "Escolha um período" }),
}

const pf = z.object({
  tipo: z.literal("PF"),
  nome: z.string().min(3, "Informe o nome completo"),
  cpf: z.string().refine((v) => isValidCPF(v), "CPF inválido"),
  rg: z.string().min(5, "RG obrigatório").optional(),
  nasc: z.string().refine((v) => isAdult(v), "Data no formato DD/MM/AAAA e idade mínima 18"),
  nomePai: z.string().optional(),
  nomeMae: z.string().optional(),
  ...base,
})

const pj = z.object({
  tipo: z.literal("PJ"),
  razaoSocial: z.string().min(3, "Razão Social obrigatória"),
  nomeFantasia: z.string().optional(),
  cnpj: z.string().refine((v) => isValidCNPJ(v), "CNPJ inválido"),
  ieim: z.string().optional(),
  respNome: z.string().min(3, "Responsável legal obrigatório"),
  respCpf: z.string().refine((v) => isValidCPF(v), "CPF do responsável inválido"),
  respCargo: z.string().min(2, "Cargo obrigatório"),
  ...base,
})

const schema = z.discriminatedUnion("tipo", [pf, pj])
type FormData = z.infer<typeof schema>

// --- Funções de validação ---
function isValidCPF(v: string) {
  const s = onlyDigits(v)
  if (!s || s.length !== 11 || /^(\d)\1+$/.test(s)) return false
  let sum = 0
  for (let i = 0; i < 9; i++) sum += Number.parseInt(s[i]) * (10 - i)
  let d1 = (sum * 10) % 11
  if (d1 === 10) d1 = 0
  if (d1 !== Number.parseInt(s[9])) return false
  sum = 0
  for (let i = 0; i < 10; i++) sum += Number.parseInt(s[i]) * (11 - i)
  let d2 = (sum * 10) % 11
  if (d2 === 10) d2 = 0
  return d2 === Number.parseInt(s[10])
}

function isValidCNPJ(v: string) {
  const s = onlyDigits(v)
  if (!s || s.length !== 14 || /^(\d)\1+$/.test(s)) return false
  const c = s.split("").map(Number)
  const calc = (base: number[]) =>
    base.reduce((acc, val, i) => acc + val * [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2][i], 0) % 11
  const d1 = calc(c.slice(0, 12))
  const v1 = d1 < 2 ? 0 : 11 - d1
  const calc2 = (base: number[]) =>
    base.reduce((acc, val, i) => acc + val * [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2][i], 0) % 11
  const d2 = calc2(c.slice(0, 12).concat(v1))
  const v2 = d2 < 2 ? 0 : 11 - d2
  return v1 === c[12] && v2 === c[13]
}

const isAdult = (ddmmaa: string) => {
  const m = ddmmaa.match(/(\d{2})\/(\d{2})\/(\d{4})/)
  if (!m) return false
  const d = new Date(+m[3], +m[2] - 1, +m[1])
  if (isNaN(d.getTime())) return false
  const today = new Date()
  let age = today.getFullYear() - d.getFullYear()
  const adj = today.getMonth() < d.getMonth() || (today.getMonth() === d.getMonth() && today.getDate() < d.getDate())
  if (adj) age--
  return age >= 18
}

// --- Funções de construção de mensagens ---
const buildWA = (d: FormData) => {
  const head = d.tipo === "PF" ? `Quero ser cliente ConexãoNet (PF).` : `Quero ser cliente ConexãoNet (PJ).`

  const planNames: Record<string, string> = {
    "40mb": "Básico 40 Mb - R$ 59,90/mês",
    "200mb": "Intermediário 200 Mb - R$ 79,90/mês",
    "500mb": "Avançado 500 Mb - R$ 99,90/mês",
    "750mb": "Ultra 750 Mb - R$ 129,90/mês",
  }

  const pessoa =
    d.tipo === "PF"
      ? `
*Dados Pessoais (PF)*
Nome: ${d.nome}
CPF: ${d.cpf}
RG: ${"rg" in d && d.rg ? d.rg : "-"}
Nascimento: ${d.nasc}
Pai: ${"nomePai" in d && d.nomePai ? d.nomePai : "-"}
Mãe: ${"nomeMae" in d && d.nomeMae ? d.nomeMae : "-"}
Telefone 1: ${d.telefone1}  Telefone 2: ${d.telefone2 ?? "-"}
E-mail: ${d.email}
`
      : `
*Dados da Empresa (PJ)*
Razão Social: ${d.razaoSocial}
Nome Fantasia: ${d.nomeFantasia ?? "-"}
CNPJ: ${d.cnpj}
IE/IM: ${d.ieim ?? "-"}
Responsável: ${d.respNome} | CPF: ${d.respCpf} | Cargo: ${d.respCargo}
Telefone 1: ${d.telefone1}  Telefone 2: ${d.telefone2 ?? "-"}
E-mail principal: ${d.email}
`

  const endereco = `
*Endereço*
Bairro: ${d.bairro}
Rua: ${d.rua}, Nº ${d.numero}
Complemento: ${d.complemento ?? "-"}
Referência: ${d.referencia ?? "-"}
`

  const plano = `
*Plano Escolhido*
${planNames[d.plano]}

*Pagamento e Instalação*
Vencimento desejado: dia ${d.vencimento}
Disponibilidade para instalação: ${d.disponibilidade}
`

  return encodeURIComponent([head, pessoa, endereco, plano].join("\n").trim())
}

// --- Componente ---
export default function ClienteCadastroForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tipo: "PF",
      plano: undefined,
      vencimento: undefined,
      disponibilidade: undefined,
    },
  })

  const tipo = watch("tipo")

  React.useEffect(() => {
    const sub = watch((val, { name }) => {
      if (name === "cpf" && typeof val.cpf === "string") setValue("cpf", maskCpf(val.cpf))
      if (name === "cnpj" && typeof val.cnpj === "string") setValue("cnpj", maskCnpj(val.cnpj))
      if (name === "respCpf" && typeof val.respCpf === "string") setValue("respCpf", maskCpf(val.respCpf))
      if (name === "telefone1" && typeof val.telefone1 === "string") setValue("telefone1", maskPhone(val.telefone1))
      if (name === "telefone2" && typeof val.telefone2 === "string") setValue("telefone2", maskPhone(val.telefone2))
    })
    return () => sub.unsubscribe()
  }, [watch, setValue])

  const onSubmit = (data: FormData) => {
    try {
      const url = `https://wa.me/${WAPP}?text=${buildWA(data)}`
      window.open(url, "_blank")
    } catch (error) {
      console.error("[v0] Error submitting form:", error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-card border border-border rounded-2xl p-6 text-text"
    >
      <h2 className="text-2xl font-semibold">Quero ser cliente</h2>

      {/* Tipo de Cliente */}
      <div>
        <Label className="mb-2 block">Tipo de Cliente*</Label>
        <RadioGroup
          defaultValue="PF"
          className="flex gap-6"
          onValueChange={(v) => setValue("tipo", v as FormData["tipo"])}
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="PF" id="pf" />
            <Label htmlFor="pf">Pessoa Física (PF)</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="PJ" id="pj" />
            <Label htmlFor="pj">Pessoa Jurídica (PJ)</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Plano Desejado */}
      <section>
        <h3 className="font-medium mb-2">Plano Desejado</h3>
        <div>
          <Label>Escolha seu plano*</Label>
          <Select onValueChange={(v) => setValue("plano", v as FormData["plano"], { shouldValidate: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um plano" />
            </SelectTrigger>
            <SelectContent className="bg-card border border-border z-50">
              <SelectItem value="40mb">Básico - 40 Mb (R$ 59,90/mês)</SelectItem>
              <SelectItem value="200mb">Intermediário - 200 Mb (R$ 79,90/mês)</SelectItem>
              <SelectItem value="500mb">Avançado - 500 Mb (R$ 99,90/mês)</SelectItem>
              <SelectItem value="750mb">Ultra - 750 Mb (R$ 129,90/mês)</SelectItem>
            </SelectContent>
          </Select>
          {errors.plano && <p className="text-red-500 text-sm">{errors.plano.message}</p>}
        </div>
      </section>

      {/* Dados Pessoais */}
      {tipo === "PF" && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Nome*</Label>
            <Input {...register("nome")} placeholder="Nome completo" />
            {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
          </div>
          <div>
            <Label>CPF*</Label>
            <Input {...register("cpf")} inputMode="numeric" placeholder="000.000.000-00" />
            {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
          </div>
          <div>
            <Label>RG</Label>
            <Input {...register("rg")} placeholder="RG" />
            {errors.rg && <p className="text-red-500 text-sm">{errors.rg.message}</p>}
          </div>
          <div>
            <Label>Data de Nascimento*</Label>
            <Input {...register("nasc")} placeholder="DD/MM/AAAA" />
            {errors.nasc && <p className="text-red-500 text-sm">{errors.nasc.message}</p>}
          </div>
          <div>
            <Label>Nome do Pai</Label>
            <Input {...register("nomePai")} />
            {errors.nomePai && <p className="text-red-500 text-sm">{errors.nomePai.message}</p>}
          </div>
          <div>
            <Label>Nome da Mãe</Label>
            <Input {...register("nomeMae")} />
            {errors.nomeMae && <p className="text-red-500 text-sm">{errors.nomeMae.message}</p>}
          </div>
        </section>
      )}

      {/* Dados da Empresa */}
      {tipo === "PJ" && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Razão Social*</Label>
            <Input {...register("razaoSocial")} />
            {errors.razaoSocial && <p className="text-red-500 text-sm">{errors.razaoSocial.message}</p>}
          </div>
          <div>
            <Label>Nome Fantasia</Label>
            <Input {...register("nomeFantasia")} />
            {errors.nomeFantasia && <p className="text-red-500 text-sm">{errors.nomeFantasia.message}</p>}
          </div>
          <div>
            <Label>CNPJ*</Label>
            <Input {...register("cnpj")} inputMode="numeric" placeholder="00.000.000/0000-00" />
            {errors.cnpj && <p className="text-red-500 text-sm">{errors.cnpj.message}</p>}
          </div>
          <div>
            <Label>IE/IM</Label>
            <Input {...register("ieim")} />
            {errors.ieim && <p className="text-red-500 text-sm">{errors.ieim.message}</p>}
          </div>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Responsável Legal*</Label>
              <Input {...register("respNome")} placeholder="Nome completo" />
              {errors.respNome && <p className="text-red-500 text-sm">{errors.respNome.message}</p>}
            </div>
            <div>
              <Label>CPF do Responsável*</Label>
              <Input {...register("respCpf")} inputMode="numeric" placeholder="000.000.000-00" />
              {errors.respCpf && <p className="text-red-500 text-sm">{errors.respCpf.message}</p>}
            </div>
            <div>
              <Label>Cargo*</Label>
              <Input {...register("respCargo")} placeholder="Cargo" />
              {errors.respCargo && <p className="text-red-500 text-sm">{errors.respCargo.message}</p>}
            </div>
          </div>
        </section>
      )}

      {/* Telefone e E-mail */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Telefone 1 (WhatsApp)*</Label>
          <Input {...register("telefone1")} inputMode="tel" placeholder="(33) 9XXXX-XXXX" />
          {errors.telefone1 && <p className="text-red-500 text-sm">{errors.telefone1.message}</p>}
        </div>
        <div>
          <Label>Telefone 2</Label>
          <Input {...register("telefone2")} inputMode="tel" placeholder="(33) 9XXXX-XXXX" />
          {errors.telefone2 && <p className="text-red-500 text-sm">{errors.telefone2.message}</p>}
        </div>
        <div>
          <Label>E-mail principal*</Label>
          <Input {...register("email")} type="email" placeholder="seuemail@exemplo.com" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
      </section>

      {/* Endereço */}
      <section>
        <h3 className="font-medium mb-2">Endereço</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Bairro*</Label>
            <Input {...register("bairro")} />
            {errors.bairro && <p className="text-red-500 text-sm">{errors.bairro.message}</p>}
          </div>
          <div className="md:col-span-2">
            <Label>Rua*</Label>
            <Input {...register("rua")} />
            {errors.rua && <p className="text-red-500 text-sm">{errors.rua.message}</p>}
          </div>
          <div>
            <Label>Número*</Label>
            <Input {...register("numero")} />
            {errors.numero && <p className="text-red-500 text-sm">{errors.numero.message}</p>}
          </div>
          <div className="md:col-span-2">
            <Label>Complemento</Label>
            <Input {...register("complemento")} placeholder="Casa, apartamento, loja, etc." />
          </div>
          <div className="md:col-span-3">
            <Label>Referência</Label>
            <Textarea {...register("referencia")} placeholder="Ponto de referência" />
          </div>
        </div>
      </section>

      {/* Pagamento & Instalação */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Data de Vencimento do Plano*</Label>
          <Select onValueChange={(v) => setValue("vencimento", v as FormData["vencimento"], { shouldValidate: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-card border border-border z-50">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
          {errors.vencimento && <p className="text-red-500 text-sm">{errors.vencimento.message}</p>}
        </div>
        <div>
          <Label>Disponibilidade para Instalação*</Label>
          <Select
            onValueChange={(v) =>
              setValue("disponibilidade", v as FormData["disponibilidade"], { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-card border border-border z-50">
              <SelectItem value="Manhã">Manhã</SelectItem>
              <SelectItem value="Tarde">Tarde</SelectItem>
              <SelectItem value="Noite">Noite</SelectItem>
            </SelectContent>
          </Select>
          {errors.disponibilidade && <p className="text-red-500 text-sm">{errors.disponibilidade.message}</p>}
        </div>
      </section>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting} className="bg-brand-orange hover:bg-brand-orange-600 text-white">
          Enviar pelo WhatsApp
        </Button>
      </div>

      <p className="text-sm text-muted">
        Ao enviar, concordo em receber contato da ConexãoNet para finalizar a contratação.
      </p>
    </form>
  )
}
