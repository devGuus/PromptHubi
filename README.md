# PromptHubi

Biblioteca interna de prompts de IA da **Hubi Happiness**. Permite que os colaboradores armazenem, organizem, encontrem, editem e reutilizem prompts em poucos segundos — sem precisar procurar em conversas antigas, documentos ou anotações soltas.

---

## Para usuários (colaboradores Hubi Happiness)

### O que é

O PromptHubi é o lugar onde ficam guardados os prompts de IA usados pela empresa. A ideia é simples: **abrir → pesquisar → encontrar → copiar**, em poucos segundos.

### Navegação

A barra lateral (ou a barra inferior, no celular) dá acesso a:

- **Dashboard** — visão inicial com um resumo (total de prompts, favoritos, categorias) e a lista de prompts mais recentes.
- **Todos os Prompts** — lista completa, com filtros e ordenação.
- **Favoritos** — apenas os prompts marcados com estrela.
- **Categorias** — os prompts agrupados por categoria, com a contagem de cada uma.
- **Configurações** — alternância entre tema claro e escuro.

### Buscar um prompt

Digite no campo **"Buscar prompts..."** no topo da página. A busca é em tempo real e olha para título, descrição, categoria, tags e o conteúdo do prompt. Não é necessário apertar Enter.

Também é possível refinar a lista com os filtros de **categoria**, **tag** e **favoritos**, e ordenar por mais recentes, mais antigos ou nome (A-Z / Z-A).

### Criar um prompt

1. Clique em **"+ Novo Prompt"** (topo da página).
2. Preencha:
   - **Título** (obrigatório)
   - **Descrição** — uma frase explicando para que serve
   - **Categoria** — escolha uma da lista
   - **Tags** — digite uma palavra e pressione Enter para adicionar
   - **Prompt** — o conteúdo completo, cole ou escreva à vontade (o campo aceita textos longos)
3. Clique em **Salvar Prompt**.

### Usar um prompt

Ao abrir um prompt, você verá o conteúdo completo em destaque. Clique em **Copiar Prompt** — o conteúdo vai para a área de transferência e o botão mostra **"✓ Copiado"** por alguns segundos como confirmação.

Nessa mesma página também é possível:

- **Favoritar** (ícone de estrela ao lado do título)
- **Editar** o prompt
- **Duplicar** (cria uma cópia, útil para criar variações)
- **Excluir** (pede confirmação antes de apagar — a ação não pode ser desfeita)

### Tema claro/escuro

O ícone de sol/lua no topo alterna entre os temas. A preferência fica salva no navegador.

### No celular

O layout se adapta: a navegação vira uma barra fixa na parte inferior da tela, e a busca, a lista e a criação de prompts continuam com poucos toques de distância.

---

## Para desenvolvedores

### Stack técnica

| Camada | Tecnologia |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Components + Server Actions) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS v4 (config via CSS, sem `tailwind.config.js`) |
| Banco de dados | SQLite, via [Prisma ORM 6](https://www.prisma.io) |
| Tema claro/escuro | `next-themes` |
| Ícones | `lucide-react` |
| Validação | `zod` |

Não há uma API REST/GraphQL separada: as páginas (Server Components) leem o banco diretamente, e todas as mutações (criar, editar, excluir, favoritar, duplicar) são [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) em `src/actions/prompt-actions.ts`.

### Pré-requisitos

- [Node.js](https://nodejs.org) 20 ou superior (o projeto foi desenvolvido com a versão 24 LTS)
- npm (vem junto com o Node.js)

### Configuração inicial

```bash
npm install
npx prisma migrate dev   # cria/atualiza o banco SQLite local (prisma/dev.db)
npx prisma db seed       # popula as 10 categorias padrão
```

O `postinstall` do `npm install` já roda `prisma generate` automaticamente, então o client do Prisma fica pronto sem passo extra.

### Rodando o projeto

```bash
npm run dev
```

Acesse **http://localhost:3000**.

### Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento (com Turbopack) |
| `npm run build` | Gera o build de produção |
| `npm run start` | Roda o build de produção (rodar `build` antes) |
| `npm run lint` | ESLint |
| `npm run typecheck` | Checagem de tipos (`tsc --noEmit`) sem gerar arquivos |
| `npx prisma studio` | Interface visual para ver/editar o banco de dados |
| `npx prisma migrate dev --name <nome>` | Cria uma nova migration após alterar `prisma/schema.prisma` |
| `npx prisma db seed` | Roda `prisma/seed.ts` (recria as categorias padrão, é idempotente) |

### Estrutura do projeto

```
prisma/
  schema.prisma        # modelos do banco (Category, Tag, Prompt)
  seed.ts              # popula as categorias padrão (sem dados de prompt fake)
  migrations/          # histórico de migrations do banco

src/
  app/                 # rotas (App Router) — cada pasta é uma página
    page.tsx           # Dashboard ("/")
    prompts/           # "/prompts", "/prompts/new", "/prompts/[id]", "/prompts/[id]/edit"
    favorites/         # "/favorites"
    categories/        # "/categories", "/categories/[slug]"
    settings/          # "/settings"

  actions/
    prompt-actions.ts  # Server Actions: criar, editar, excluir, duplicar, favoritar

  components/
    layout/            # Sidebar, navegação mobile, topbar, shell da aplicação
    prompts/           # lista, formulário, busca, filtros, copiar, favoritar, tags...
    categories/        # grade de categorias
    theme/             # provider e botão de tema claro/escuro
    ui/                # botão, input, select, textarea, badge, diálogo, toast...

  lib/
    prisma.ts          # instância única do Prisma Client
    prompts.ts         # todas as consultas ao banco (getPrompts, getSummaryStats...)
    validation.ts       # schemas Zod (formulário e parâmetros de busca)
    constants.ts, format.ts, utils.ts
    hooks/              # hooks compartilhados (parâmetro de URL debounced, etc.)

  types/                # tipos TypeScript compartilhados

  generated/prisma/     # client do Prisma gerado automaticamente (não editar; recriado por `prisma generate`)
```

### Banco de dados

Três modelos, definidos em `prisma/schema.prisma`:

- **Category** — `id`, `name`, `slug`. Tabela real (não enum), para permitir adicionar categorias no futuro sem migration de código. As 10 categorias iniciais (Marketing, Atendimento, E-commerce, Imagem, Vídeo, Texto, Comunicação, Produtividade, Programação, Outros) são criadas pelo `seed.ts`.
- **Tag** — `id`, `name` (única), relação muitos-para-muitos com `Prompt`.
- **Prompt** — `id`, `title`, `description`, `content`, `favorite`, `categoryId`, `tags`, `createdAt`, `updatedAt`, e um campo `userId` (opcional, sem relação ainda) reservado para quando o sistema tiver autenticação.

O banco usado é SQLite (`prisma/dev.db`), ignorado pelo Git. Cada máquina/ambiente tem o seu próprio arquivo local, criado pela migration.

### Busca, filtros e ordenação

Tudo é controlado pela URL (`?q=&category=&favorite=&tag=&sort=`). As páginas de listagem são Server Components que leem esses parâmetros e consultam o Prisma diretamente — não existe um estado de busca duplicado no cliente. O campo de busca no topo é um componente cliente que atualiza a URL com um pequeno debounce (300ms) via `router.replace`, então a lista (renderizada no servidor) reage automaticamente.

### Decisões técnicas relevantes

- **Prisma fixado na versão 6.12.0** (não a mais recente): versões 6.13+ têm uma vulnerabilidade de alta severidade em uma dependência transitiva (`deepmerge-ts`), e a versão 7 exige um driver adapter nativo (`better-sqlite3`) que adiciona complexidade desnecessária para este projeto.
- **Sem dados fictícios no seed** — apenas as categorias (dado de referência real) são criadas automaticamente. A lista de prompts começa genuinamente vazia.
- **Tailwind v4** usa configuração via CSS (`src/app/globals.css`), não um arquivo `tailwind.config.js`. O tema escuro usa `@custom-variant dark` porque o v4 não tem mais a opção `darkMode: "class"` do v3.
- **Sem framework de testes automatizados** ainda — a verificação é feita via `lint` + `typecheck` + `build` + testes manuais dos fluxos principais. Pode ser adicionado no futuro (ex.: Playwright/Vitest) se fizer sentido para o time.

### O que foi propositalmente deixado de fora (roadmap futuro)

Por decisão de escopo do MVP, os itens abaixo **não** estão implementados, mas a estrutura do banco não impede que sejam adicionados depois: login/autenticação, usuários e permissões, departamentos, prompts públicos/privados, histórico de versões, coleções, compartilhamento, IA para melhorar prompts, variáveis de prompt, fluxo de aprovação, analytics e integrações com outras ferramentas da Hubi Happiness.
