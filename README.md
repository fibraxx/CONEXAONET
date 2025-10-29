# ConexãoNet — Website Oficial

Website completo e responsivo para a ConexãoNet, provedor de internet por fibra óptica em Padre Paraíso–MG.

## 🚀 Tecnologias

- **Next.js 14** com App Router
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (componentes)
- **Lucide React** (ícones)
- **Leaflet** (mapas)
- **TMDB API** (catálogo de filmes e séries)

## 📦 Instalação

\`\`\`bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
\`\`\`

O site estará disponível em `http://localhost:3000`

## 📝 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

\`\`\`env
# TMDB API Key (obrigatório para /conexaotv)
# Obtenha em: https://www.themoviedb.org/settings/api
TMDB_API_KEY=sua_chave_api_aqui

# URL base da aplicação (opcional)
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

#### Como obter a chave TMDB:

1. Acesse [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Crie uma conta gratuita
3. Vá em **Configurações** → **API**
4. Solicite uma chave de API (escolha "Developer")
5. Copie a **API Key (v3 auth)** e cole no `.env.local`

### Editar Planos

Os planos estão centralizados em `src/data/plans.json`. Para adicionar, remover ou editar planos:

\`\`\`json
{
  "id": "novo-plano",
  "speed": "1000",
  "price": "199,90",
  "badge": "Novo",
  "features": [...]
}
\`\`\`

### Editar Informações da Empresa

Todas as informações de contato, endereço e horários estão em `src/config/company.ts`:

- Nome e slogan
- Telefone e WhatsApp
- E-mail
- Endereço completo
- Horários de funcionamento
- CNPJ
- Redes sociais

### Editar Horários de Funcionamento

Em `src/config/company.ts`, ajuste o array `schedule`:

\`\`\`typescript
schedule: [
  { day: 1, periods: [{ start: 8, end: 12 }, { start: 14, end: 18 }] }, // Segunda
  // day: 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
]
\`\`\`

### ConexãoNetTV — Canais e VOD

#### Atualizar lista de canais

Edite `data/cdntv-channels.json`:

\`\`\`json
{
  "channels": [
    {
      "id": "canal-id",
      "name": "Nome do Canal",
      "logo": "https://url-do-logo.png",
      "genre": "Abertos|Notícias|Esportes|Filmes|Kids|Música"
    }
  ]
}
\`\`\`

#### Atualizar catálogo VOD

Edite `data/cdntv-vod.json`:

\`\`\`json
{
  "items": [
    {
      "id": "1",
      "title": "Título do Conteúdo",
      "poster": "/caminho/para/poster.jpg",
      "kind": "movie|tv|kids|doc",
      "year": 2024
    }
  ]
}
\`\`\`

**Nota**: Os dados de "Em Alta Agora" são obtidos automaticamente da API do TMDB.

## 🎨 Design Tokens

As cores e estilos estão definidos em `app/globals.css`:

- **Brand Orange**: `#FF6A00`
- **Background**: `#0B0B0B`
- **Surface**: `#0F0F10`
- **Text**: `#FFFFFF`
- **Text Muted**: `#C9CDD2`
- **Border**: `#262626`

## 📄 Páginas

- `/` — Home (hero, planos, diferenciais, depoimentos, FAQ)
- `/planos` — Listagem completa de planos
- `/cobertura` — Mapa interativo e verificação de disponibilidade
- `/suporte` — Canais de atendimento e formulário de contato
- `/conexaotv` — ConexãoNetTV (canais ao vivo, VOD, trending)
- `/privacidade` — Política de privacidade

**ConexãoNetTV** também está disponível via subdomínio dedicado: **tv.conexaonet-pp.com.br**

## 🔧 Funcionalidades

- ✅ Design responsivo (mobile-first)
- ✅ Botão flutuante de WhatsApp
- ✅ Indicador de horário de funcionamento (aberto/fechado)
- ✅ Mapa interativo com Leaflet
- ✅ Formulário de contato
- ✅ Catálogo de TV e filmes com TMDB
- ✅ Busca e filtros interativos
- ✅ SEO otimizado
- ✅ Acessibilidade (WCAG AA)
- ✅ Performance otimizada

## 🎬 ConexãoNetTV

A página `/conexaotv` oferece:

- **Guia de Canais**: Grade interativa com 160+ canais, busca e filtros por gênero
- **Catálogo VOD**: Filmes, séries, infantil e documentários sob demanda
- **Em Alta Agora**: Conteúdo trending do TMDB (filmes, séries, nos cinemas)
- **API Routes**: Endpoints otimizados com cache de 12h

### Estrutura de APIs

- `GET /api/cdntv/channels` — Lista de canais (fallback: JSON local)
- `GET /api/cdntv/vod` — Catálogo VOD (fallback: JSON local)
- `GET /api/tmdb/trending?type=movie|tv` — Trending do TMDB
- `GET /api/tmdb/now-playing` — Filmes em cartaz no Brasil

### Cache e Performance

- Revalidação: 12 horas (43200s)
- Fallback automático para dados locais em caso de erro
- Headers de cache otimizados (stale-while-revalidate)

## 📱 Contato

- **WhatsApp**: (33) 98410-4073
- **E-mail**: conexaonet.pp@gmail.com
- **Endereço**: Rua Araçuaí, 128 – Centro, Padre Paraíso – MG

## 📄 Licença

© ConexãoNet — Todos os direitos reservados.
