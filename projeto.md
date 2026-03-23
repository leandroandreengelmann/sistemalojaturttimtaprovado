# PRD — Plataforma de Vitrine Comercial com CTA "Falar com o Vendedor"

> **Versão:** 1.0  
> **Status:** Em aprovação  
> **Responsável:** Product Manager  
> **Público-alvo:** Time de Produto, Engenharia, Design, Comercial  
> **Classificação:** Confidencial  
> **Última atualização:** Março de 2026

---

## Sumário

1. [Visão Geral do Produto](#1-visão-geral-do-produto)
2. [Objetivos e Métricas de Sucesso](#2-objetivos-e-métricas-de-sucesso)
3. [Posicionamento e Proposta de Valor](#3-posicionamento-e-proposta-de-valor)
4. [Personas e Jornada do Usuário](#4-personas-e-jornada-do-usuário)
5. [Arquitetura Macro do Sistema](#5-arquitetura-macro-do-sistema)
6. [Área Pública — Páginas e Componentes](#6-área-pública--páginas-e-componentes)
   - [6.1 Home](#61-home)
   - [6.2 Loja / Catálogo](#62-loja--catálogo)
   - [6.3 Páginas de Categoria e Subcategoria](#63-páginas-de-categoria-e-subcategoria)
   - [6.4 Página de Produto](#64-página-de-produto)
   - [6.5 Páginas Institucionais](#65-páginas-institucionais)
   - [6.6 Busca e Resultados](#66-busca-e-resultados)
   - [6.7 Nossas Lojas / Unidades](#67-nossas-lojas--unidades)
   - [6.8 Contato](#68-contato)
7. [Componentes Globais e Design System](#7-componentes-globais-e-design-system)
8. [Estratégia de CTA "Falar com o Vendedor"](#8-estratégia-de-cta-falar-com-o-vendedor)
9. [Área Administrativa (CMS)](#9-área-administrativa-cms)
   - [9.1 Login e Dashboard](#91-login-e-dashboard)
   - [9.2 Gestão de Produtos](#92-gestão-de-produtos)
   - [9.3 Gestão de Categorias e Subcategorias](#93-gestão-de-categorias-e-subcategorias)
   - [9.4 Gestão de Banners](#94-gestão-de-banners)
   - [9.5 Gestão de Páginas Institucionais](#95-gestão-de-páginas-institucionais)
   - [9.6 Gestão de Lojas e Unidades](#96-gestão-de-lojas-e-unidades)
   - [9.7 Gestão de Menus e Rodapé](#97-gestão-de-menus-e-rodapé)
   - [9.8 Central de Contatos Comerciais](#98-central-de-contatos-comerciais)
10. [Regras Funcionais e Restrições](#10-regras-funcionais-e-restrições)
11. [Requisitos Não Funcionais](#11-requisitos-não-funcionais)
12. [Responsividade e Acessibilidade](#12-responsividade-e-acessibilidade)
13. [Estados de Interface (UX States)](#13-estados-de-interface-ux-states)
14. [Sitemap Completo](#14-sitemap-completo)
15. [Prioridade de MVP e Roadmap](#15-prioridade-de-mvp-e-roadmap)
16. [Glossário](#16-glossário)

---

## 1. Visão Geral do Produto

Este documento define os requisitos de produto para uma plataforma web que combina a experiência visual de um e-commerce moderno com a lógica comercial de um catálogo digital orientado à conversão via contato humano. A plataforma é composta por uma **área pública** (vitrine e institucional) e uma **área administrativa** (CMS completo).

### Síntese do Produto

| Campo | Valor |
|---|---|
| Nome do Produto | Plataforma de Vitrine Comercial |
| Tipo | Web Application (SPA ou SSR) |
| Modelo de Conversão | Contato comercial via CTA — sem carrinho ou checkout |
| Público-Alvo (usuário final) | Clientes B2B e B2C navegando o catálogo de produtos |
| Público-Alvo (admin) | Equipe comercial e de marketing da empresa |
| Áreas Principais | Área Pública (Vitrine) + CMS Administrativo |
| Versão deste PRD | 1.0 |

### Problema que o Produto Resolve

Empresas com operação física ou consultiva precisam de uma presença digital profissional que valorize seu catálogo de produtos e direcione clientes ao contato direto com vendedores, sem expor preços online ou criar fricção com fluxos de e-commerce que não refletem seu modelo de negócio.

**Dores identificadas:**

- Ausência de vitrine digital profissional para empresas com venda consultiva
- Dificuldade de organizar e apresentar catálogos extensos de forma navegável
- Baixa geração de leads qualificados a partir de canais digitais
- Dependência de ferramentas genéricas que não comunicam a identidade da marca
- Falta de controle editorial do conteúdo do site sem depender de desenvolvimento

---

## 2. Objetivos e Métricas de Sucesso

### Objetivos de Negócio

| # | Objetivo | Indicador de Sucesso |
|---|---|---|
| OBJ-01 | Aumentar a geração de leads qualificados via canal digital | Número de cliques no CTA "Falar com o Vendedor" por semana |
| OBJ-02 | Profissionalizar a presença digital da empresa | NPS de visitantes / percepção de credibilidade |
| OBJ-03 | Facilitar a navegação e descoberta de produtos | Tempo médio de sessão e páginas por visita |
| OBJ-04 | Reduzir o esforço do time de marketing na gestão do site | Tempo médio para publicar/editar conteúdo no CMS |
| OBJ-05 | Garantir cobertura multicanal de contato | Taxa de uso dos diferentes canais de CTA (WhatsApp, formulário, telefone) |

### KPIs e Critérios de Sucesso do MVP

| KPI | Meta Inicial | Prazo |
|---|---|---|
| Taxa de clique no CTA principal (CTR) | > 8% das sessões | 3 meses pós-lançamento |
| Tempo de carregamento (LCP) | < 2,5 segundos | No lançamento |
| Taxa de rejeição (bounce rate) | < 50% | 3 meses pós-lançamento |
| Tempo médio de publicação de produto via CMS | < 5 minutos | No lançamento |
| Cobertura responsiva validada | 100% das páginas | No lançamento |
| Score de acessibilidade (WCAG AA) | > 90 no Lighthouse | No lançamento |

---

## 3. Posicionamento e Proposta de Valor

### Posicionamento de Produto

A plataforma **NÃO é um e-commerce tradicional**. Ela deve ser tratada como um **catálogo comercial digital com força institucional**, onde toda a experiência conduz o visitante a iniciar uma conversa comercial.

| O produto É | O produto NÃO é |
|---|---|
| Vitrine digital profissional | E-commerce com carrinho |
| Canal de captação de leads | Marketplace ou loja virtual |
| Catálogo comercial interativo | Plataforma de pagamento online |
| Site institucional com força comercial | Catálogo estático em PDF |
| Ferramenta de conversão consultiva | Sistema de gestão de pedidos |

### Pilares da Proposta de Valor

| Pilar | Descrição |
|---|---|
| Profissionalismo | Aparência premium que eleva a percepção de marca e transmite confiabilidade |
| Organização | Catálogo estruturado em categorias e subcategorias que facilita a descoberta |
| Conversão Consultiva | Cada ponto de contato direciona o visitante a falar com um vendedor especializado |
| Gestão Autônoma | CMS completo que permite ao time de marketing atualizar conteúdo sem depender de TI |
| Experiência Moderna | Interface responsiva, ágil e fluida em todos os dispositivos |
| Presença Multicanal | Integração com WhatsApp, telefone, e-mail e formulários de contato |

---

## 4. Personas e Jornada do Usuário

### Persona 1 — Comprador Consultivo B2B

| Campo | Detalhe |
|---|---|
| Perfil | Gestor de compras ou responsável técnico em empresas |
| Objetivos | Pesquisar produtos especializados, entender especificações e solicitar orçamento |
| Dores | Dificuldade em encontrar informações técnicas detalhadas; precisa de atendimento personalizado |

### Persona 2 — Consumidor Final B2C

| Campo | Detalhe |
|---|---|
| Perfil | Pessoa física interessada nos produtos da empresa |
| Objetivos | Explorar o catálogo, descobrir produtos e entrar em contato para tirar dúvidas |
| Dores | Não sabe exatamente o que quer; precisa de orientação antes de decidir |

### Persona 3 — Administrador de Conteúdo

| Campo | Detalhe |
|---|---|
| Perfil | Colaborador do time de marketing ou comercial |
| Objetivos | Manter o site atualizado, publicar produtos e campanhas sem depender de dev |
| Dores | Ferramentas complexas que exigem conhecimento técnico |

### Jornada do Usuário (Visitante)

| Etapa | Ação do Usuário | Ponto de Contato | CTA Presente |
|---|---|---|---|
| Descoberta | Acessa o site via busca orgânica, anúncio ou indicação | Home / Landing Page | Hero CTA + Botão Flutuante |
| Exploração | Navega por categorias e subcategorias | Mega Menu / Página de Categoria | CTA nos cards de categoria |
| Avaliação | Visualiza detalhes de produtos específicos | Página de Produto | CTA principal + secundário |
| Intenção | Decide entrar em contato com um vendedor | Página de Produto / Contato | Botão "Falar com o Vendedor" |
| Conversão | Inicia conversa via WhatsApp, telefone ou formulário | Canal de atendimento externo | Mensagem pré-preenchida |

---

## 5. Arquitetura Macro do Sistema

O sistema é dividido em duas grandes áreas independentes mas integradas: a **Área Pública**, voltada ao cliente final, e a **Área Administrativa (CMS)**, voltada à equipe interna.

### Camadas do Sistema

| Camada | Descrição | Acesso |
|---|---|---|
| Área Pública (Frontend) | Vitrine de produtos, páginas institucionais, catálogo, busca e contato | Qualquer visitante |
| CMS Administrativo (Backend) | Gestão de conteúdo, produtos, banners, páginas e configurações | Usuários autenticados |
| API / Backend | Camada de serviços que conecta CMS e frontend, serve dados e processa formulários | Interno (sistema) |
| Armazenamento de Mídia | Repositório de imagens de produtos, banners e institucional | Interno (sistema) |
| Canal de Contato Externo | WhatsApp Business API, e-mail SMTP, formulário com notificação | Usuário final → vendedor |

### Módulos do Sistema

| Módulo | Nome | Escopo |
|---|---|---|
| MOD-01 | Vitrine Pública | Home, catálogo, produto, categorias, busca |
| MOD-02 | Institucional | Quem Somos, Lojas, Contato, Páginas customizadas |
| MOD-03 | CMS — Produtos | CRUD completo de produtos com imagens e especificações |
| MOD-04 | CMS — Categorias | Hierarquia categoria > subcategoria com imagens |
| MOD-05 | CMS — Banners | Gerenciamento de banners por posição e campanha |
| MOD-06 | CMS — Institucional | Páginas editáveis, lojas/unidades, menus, rodapé |
| MOD-07 | CMS — Comercial | Central de leads recebidos via formulários de contato |
| MOD-08 | Configurações | Dados gerais do site, SEO, redes sociais, integrações |

---

## 6. Área Pública — Páginas e Componentes

### 6.1 Home

A home é a principal porta de entrada do site e deve equilibrar impacto institucional com força comercial. Cada seção é estrategicamente posicionada para guiar o visitante até o CTA de contato.

#### Estrutura de Seções

| # | Seção | Conteúdo Principal | CTA |
|---|---|---|---|
| S01 | Hero Principal | Banner, chamada de impacto, subtítulo | "Falar com o Vendedor" + "Ver Produtos" |
| S02 | Faixa de Diferenciais | Ícones + textos curtos (atendimento, qualidade, etc.) | Nenhum (institucional) |
| S03 | Carrossel de Categorias | Cards visuais das categorias principais | Link para categoria |
| S04 | Banner Intermediário | Promoção ou campanha | CTA do banner |
| S05 | Produtos em Destaque | Cards dos produtos principais | "Ver detalhes" + "Falar com o Vendedor" |
| S06 | Mais Procurados / Lançamentos | Segunda vitrine temática | "Ver detalhes" |
| S07 | Bloco "Quem Somos" | Resumo institucional + imagem | "Saiba mais" |
| S08 | Marcas / Parceiros | Logotipos dos parceiros (opcional) | Nenhum |
| S09 | Nossas Lojas | Cards das unidades com cidade e contato | "Ver detalhes da loja" |
| S10 | CTA Comercial Forte | Bloco de destaque com texto persuasivo | "Falar com o Vendedor" |
| S11 | Depoimentos / FAQ / Blog | Conteúdo de credibilidade (opcional) | Links internos |

---

### 6.2 Loja / Catálogo

Página central de navegação de produtos. Funciona como índice do catálogo, com suporte a filtros, ordenação e navegação por categoria.

#### Requisitos Funcionais

| REQ | Requisito | Detalhe |
|---|---|---|
| CAT-01 | Listagem paginada de produtos | Grid responsivo com paginação ou infinite scroll |
| CAT-02 | Filtros laterais | Categoria, subcategoria, marca, destaque, lançamento |
| CAT-03 | Ordenação | Mais relevantes, A-Z, Z-A, Lançamentos, Destaques |
| CAT-04 | Breadcrumb | Navegação hierárquica sempre visível |
| CAT-05 | Card de produto | Imagem, nome, categoria, resumo, CTAs |
| CAT-06 | Contador de resultados | "Exibindo X de Y produtos" |
| CAT-07 | Estado vazio | Mensagem amigável + sugestão de categorias + CTA |
| CAT-08 | Busca inline | Campo de busca ativo na página |

---

### 6.3 Páginas de Categoria e Subcategoria

Cada categoria e subcategoria possui uma página dedicada que reforça a navegação segmentada e apresenta o conteúdo de forma contextualizada.

#### Página de Categoria inclui:

- Banner ou imagem de cabeçalho da categoria
- Título e descrição editorial da categoria
- Grid de subcategorias filhas (cards visuais)
- Listagem de produtos dessa categoria com filtros refinados
- Bloco "Precisa de ajuda?" com CTA de contato
- Breadcrumb: Início > Categoria

#### Página de Subcategoria inclui:

- Breadcrumb completo: Início > Categoria > Subcategoria
- Título, descrição e imagem da subcategoria
- Listagem de produtos vinculados
- Filtros refinados internos
- CTA forte ao final da listagem

---

### 6.4 Página de Produto

A página de produto é o ponto de maior intenção de compra. Por não haver carrinho, ela deve compensar com excelência informativa e múltiplos gatilhos de contato.

#### Estrutura da Página de Produto

| Bloco | Conteúdo | Requisitos Funcionais |
|---|---|---|
| Breadcrumb | Início > Cat > Subcat > Produto | Links ativos em todos os níveis |
| Galeria de Imagens | Imagem principal + miniaturas + zoom | Zoom hover desktop; swipe mobile; suporte a vídeo |
| Bloco Principal | Nome, categoria, marca, resumo, CTAs | CTA "Falar com o Vendedor" proeminente acima da dobra |
| Descrição Detalhada | Texto longo, benefícios, aplicações | Suporte a rich text (negrito, listas, etc.) |
| Especificações Técnicas | Tabela de atributos do produto | Campos configuráveis no CMS (chave: valor) |
| CTA Persistente | Bloco de contato repetido | Texto persuasivo + botão primário + botão WhatsApp |
| Produtos Relacionados | Carrossel de sugestões | Vinculados manualmente no CMS |
| FAQ do Produto | Perguntas e respostas (opcional) | Accordion interativo |
| Info Comercial Rápida | Atendimento, orçamento sob consulta | Texto estático ou configurável no CMS |

#### CTAs disponíveis na Página de Produto:

- **Falar com o Vendedor** — CTA primário, abre WhatsApp com produto pré-selecionado
- **Solicitar Informações** — CTA secundário, abre formulário de contato
- **Ver Telefone** — Revela o número de telefone da unidade
- **Ir para WhatsApp** — Link direto com mensagem pré-preenchida contendo nome do produto

---

### 6.5 Páginas Institucionais

| Página | Objetivo | Elementos Principais |
|---|---|---|
| Quem Somos | Gerar credibilidade e confiança | História, missão, valores, equipe, fotos, CTA |
| Nossas Lojas / Unidades | Localizar e conectar com unidades físicas | Cards por unidade, mapa, horário, telefone, CTA |
| Contato | Oferecer todos os canais de atendimento | Formulário, mapa, telefone, WhatsApp, horários |
| FAQ | Reduzir dúvidas comuns e desafogar atendimento | Accordion de perguntas e respostas agrupadas |
| Política de Privacidade | Conformidade legal (LGPD) | Texto legal editável, data de atualização |
| Termos de Uso | Conformidade legal | Texto legal editável |
| Trabalhe Conosco | Captação de talentos (opcional) | Formulário de candidatura + vagas abertas |
| Parceiros / Marcas | Valorizar o portfólio de marcas (opcional) | Grid de logos com link |

---

### 6.6 Busca e Resultados

A busca é um componente crítico para a descoberta de produtos. Deve oferecer resultados rápidos e relevantes, com sugestões inteligentes e tratamento adequado do estado vazio.

- Campo de busca disponível no cabeçalho (global) e na página de catálogo
- Autocomplete com sugestões de produtos e categorias ao digitar
- Página de resultados com filtros e ordenação
- Exibição do termo pesquisado e quantidade de resultados encontrados
- **Estado vazio:** mensagem amigável, sugestão de categorias relacionadas e CTA "Falar com o Vendedor"
- Destaque do termo buscado nos resultados (highlight)
- Busca funciona em nome, descrição, categoria e tags do produto

---

### 6.7 Nossas Lojas / Unidades

- Lista de todas as unidades com cards individuais
- Cada card exibe: nome, cidade/bairro, endereço, telefone, horário e foto
- Link para mapa (Google Maps) ou mapa embutido
- Botão "Falar com esta loja" com WhatsApp específico da unidade
- Página individual opcional por unidade com detalhe completo

---

### 6.8 Contato

- Título e texto introdutório
- Canais de atendimento: telefone, WhatsApp, e-mail, endereço
- Formulário de contato (nome, e-mail, telefone, mensagem)
- Mapa embutido com localização
- Horário de atendimento
- Botão principal "Falar com o Vendedor"

---

## 7. Componentes Globais e Design System

### 7.1 Cabeçalho (Header)

| Elemento | Comportamento Desktop | Comportamento Mobile |
|---|---|---|
| Logo | Esquerda, clicável (home) | Centro ou esquerda |
| Menu Principal | Links horizontais + dropdowns | Ícone hambúrguer → drawer lateral |
| Mega Menu | Dropdown rico com subcategorias + banner | Accordion dentro do drawer |
| Campo de Busca | Input expandível ou visível | Ícone → tela de busca full |
| CTA "Falar com Vendedor" | Botão destacado no header | Sempre visível no drawer e/ou topo |
| Link Nossas Lojas | Item de menu ou ícone de localização | Item no drawer |
| Sticky Behavior | Fixo ao topo no scroll | Fixo ao topo no scroll |

---

### 7.2 Mega Menu

- Organizado em colunas por categoria pai, com subcategorias listadas abaixo
- Coluna lateral opcional com banner promocional ou imagem de destaque
- Links rápidos para categorias em destaque ou mais acessadas
- Chamada comercial opcional (ex: "Precisa de ajuda? Fale conosco")
- Animação suave de abertura/fechamento
- Fechamento ao clicar fora ou pressionar `Esc`

---

### 7.3 Rodapé (Footer)

| Bloco | Conteúdo |
|---|---|
| Sobre a Empresa | Logo, texto institucional curto, redes sociais |
| Navegação | Links rápidos para páginas principais |
| Categorias | Lista das categorias principais do catálogo |
| Atendimento | Telefone, WhatsApp, e-mail, horário de funcionamento |
| Localização | Endereço principal ou lista de unidades |
| Conversão | Botão "Falar com o Vendedor" em destaque |
| Legal | Política de Privacidade, Termos de Uso, direitos autorais |

---

### 7.4 Botão Flutuante de Contato (FAB)

- Posicionado no canto inferior direito da tela
- Pode ser WhatsApp (ícone reconhecível) ou botão genérico "Falar com o Vendedor"
- Ao clicar: abre WhatsApp com mensagem pré-preenchida ou modal de contato
- Animação discreta de atenção (pulse) opcional
- Não interfere no conteúdo principal (z-index adequado)
- Em mobile: barra fixa inferior com botão full-width

---

### 7.5 Card de Produto

| Elemento | Obrigatório | Descrição |
|---|---|---|
| Imagem Principal | Sim | Proporção fixa (ex: 4:3 ou 1:1); placeholder se ausente |
| Selo | Não | "Novo", "Destaque", "Promoção" — configurável no CMS |
| Nome do Produto | Sim | Truncado com reticências se ultrapassar 2 linhas |
| Categoria / Subcategoria | Sim | Link clicável para a categoria |
| Resumo Curto | Sim | Até 2 linhas de texto descritivo |
| Botão "Ver Produto" | Sim | Link para a página de produto |
| Botão "Falar com Vendedor" | Sim | CTA de conversão direto no card |

#### Variações do Card:

- Horizontal / Vertical
- Versão compacta (para listas densas)
- Versão para carrossel
- Versão para resultados de busca
- Versão para produto relacionado

---

### 7.6 Carrosséis

**Tipos de carrossel presentes no sistema:**

- Produtos em destaque
- Lançamentos
- Mais procurados
- Promoções
- Relacionados
- Produtos por categoria

**Comportamentos esperados:**

- Navegação por setas
- Swipe no mobile
- Responsivo em todos os breakpoints
- Animação suave entre slides
- Bom espaçamento e leitura visual

---

## 8. Estratégia de CTA "Falar com o Vendedor"

> ⚠️ O CTA "Falar com o Vendedor" **não é apenas um botão** — é o **centro de toda a estratégia de conversão** da plataforma. Deve aparecer de forma recorrente e estratégica ao longo de toda a experiência.

### Mapa de Distribuição do CTA

| Local | Tipo de CTA | Texto Sugerido | Ação |
|---|---|---|---|
| Cabeçalho | Botão primário | Falar com o Vendedor | Abre WhatsApp / modal |
| Hero da Home | Botão primário grande | Falar com o Vendedor | Abre WhatsApp / modal |
| Cards de Produto | Botão secundário | Falar com o Vendedor | Abre WhatsApp com produto |
| Página de Produto | Botão primário + secundário | Falar com o Vendedor / Solicitar Informações | WhatsApp + formulário |
| Bloco CTA Home | Botão grande em bloco de destaque | Fale agora com nossa equipe | Abre WhatsApp / modal |
| Rodapé | Botão | Falar com o Vendedor | Abre WhatsApp / modal |
| Botão Flutuante | FAB permanente | Ícone WhatsApp ou "Falar" | Abre WhatsApp |
| Página de Categoria | Bloco inferior | Precisa de ajuda? Fale conosco | Abre WhatsApp / modal |
| Busca sem resultado | Bloco de fallback | Não encontrou? Fale com um vendedor | Abre WhatsApp / modal |
| Página Quem Somos | CTA institucional | Entre em contato com nossa equipe | Abre formulário de contato |
| Páginas de Lojas | Por unidade | Falar com esta loja | WhatsApp específico da unidade |

### Regras de Comportamento do CTA

1. O texto pode variar contextualmente, mas o objetivo da ação deve ser sempre claro: **iniciar contato comercial**
2. Quando abrir WhatsApp, a mensagem deve ser pré-preenchida com contexto: _"Olá! Tenho interesse no produto [Nome do Produto]."_
3. O CTA **nunca** deve levar a uma página de checkout, carrinho ou pagamento
4. O botão flutuante deve ser o último recurso sempre disponível, independente da página
5. Em mobile, o CTA deve ser ainda mais proeminente — preferencialmente em barra fixa inferior
6. Todos os CTAs devem ser rastreáveis por evento de analytics (ex: Google Tag Manager)

### Variações de Texto Aceitas

- Falar com o Vendedor
- Solicitar Atendimento
- Pedir Informações
- Solicitar Orçamento
- Tirar Dúvidas com um Vendedor
- Fale Conosco
- Falar com esta Loja
- Fale agora com nossa equipe
- Não encontrou? Fale conosco

---

## 9. Área Administrativa (CMS)

O CMS é a retaguarda completa do sistema. Permite que o time de marketing e comercial gerencie todo o conteúdo da vitrine de forma autônoma, sem depender de desenvolvimento.

---

### 9.1 Login e Dashboard

#### Tela de Login

- Campo de e-mail ou usuário + senha
- Botão de entrar com feedback visual de loading
- Tratamento de erro: "Credenciais inválidas" sem expor qual campo está errado
- Link "Esqueci minha senha" com fluxo de recuperação por e-mail
- Layout limpo, com logo da empresa centralizada
- Redirecionamento automático ao dashboard após autenticação

#### Dashboard

| Elemento | Conteúdo |
|---|---|
| Card de Resumo | Total de produtos ativos / inativos |
| Card de Resumo | Total de categorias cadastradas |
| Card de Resumo | Total de banners ativos |
| Card de Resumo | Total de lojas/unidades cadastradas |
| Card de Resumo | Contatos recebidos (últimos 7 dias) |
| Atalhos Rápidos | Links diretos para os módulos mais usados |
| Alertas | Produtos sem imagem, banners vencidos, páginas inativas |

---

### 9.2 Gestão de Produtos

#### Tela de Listagem

- Tabela com colunas: imagem miniatura, nome, categoria, status, destaque, data de cadastro, ações
- Busca por nome ou SKU
- Filtros por categoria, subcategoria, status, destaque, lançamento
- Ações rápidas por linha: editar, ativar/desativar, duplicar, excluir
- Seleção múltipla para ações em lote
- Paginação configurável (10 / 25 / 50 itens por página)

#### Formulário de Cadastro / Edição de Produto

| Campo | Tipo | Obrigatório | Observações |
|---|---|---|---|
| Nome | Texto | Sim | Máx. 120 caracteres |
| Slug / URL Amigável | Texto | Sim | Auto-gerado a partir do nome; editável |
| Categoria | Select | Sim | Lista de categorias cadastradas |
| Subcategoria | Select | Não | Filtrada pela categoria selecionada |
| Marca | Texto / Select | Não | Campo livre ou lista cadastrada |
| Descrição Curta | Textarea | Sim | Máx. 300 caracteres; exibida nos cards |
| Descrição Completa | Rich Text Editor | Não | Suporte a HTML básico, listas, negrito |
| Imagem Principal | Upload | Sim | JPG/PNG; mín. 800x600px recomendado |
| Galeria de Imagens | Upload múltiplo | Não | Até 10 imagens; reordenável |
| Especificações | Campos dinâmicos (chave: valor) | Não | Pares adicionáveis e removíveis |
| Produtos Relacionados | Busca e seleção | Não | Vinculação manual de outros produtos |
| Selo | Select | Não | Novo, Destaque, Promoção, Em Alta |
| Destaque na Home | Checkbox | Não | Aparece nas seções de destaques |
| Lançamento | Checkbox | Não | Aparece na seção de lançamentos |
| Status | Toggle | Sim | Ativo / Inativo |
| Ordem de Exibição | Número | Não | Menor número = aparece primeiro |
| SEO: Título | Texto | Não | Máx. 60 caracteres |
| SEO: Descrição | Textarea | Não | Máx. 160 caracteres |

---

### 9.3 Gestão de Categorias e Subcategorias

#### Campos de Categoria

| Campo | Tipo | Obrigatório |
|---|---|---|
| Nome | Texto | Sim |
| Slug / URL | Texto | Sim |
| Imagem de Capa | Upload | Sim |
| Descrição | Textarea / Rich Text | Não |
| Subcategorias vinculadas | Seleção múltipla | Não |
| Destaque no Mega Menu | Checkbox | Não |
| Destaque na Home | Checkbox | Não |
| Ordem de exibição | Número | Não |
| Status | Toggle | Sim |

#### Subcategorias

Campos idênticos aos de Categoria, com adição do campo **"Categoria Pai"** (obrigatório), vinculando hierarquicamente a subcategoria a uma categoria existente.

---

### 9.4 Gestão de Banners

| Campo | Tipo | Detalhes |
|---|---|---|
| Título do Banner | Texto | Exibido sobre a imagem ou como legenda (opcional) |
| Subtítulo | Texto | Texto secundário da chamada |
| Imagem Desktop | Upload | Dimensões específicas por posição (ex: 1920x600px para hero) |
| Imagem Mobile | Upload | Versão adaptada para telas menores |
| Link de Destino | URL | Pode ser interno (categoria, produto) ou externo |
| Texto do CTA | Texto | Ex: "Ver Produtos", "Saiba Mais", "Falar com o Vendedor" |
| Posição | Select | Home Hero, Home Intermediário, Categoria, Página Interna |
| Ordem | Número | Para carrosséis com múltiplos banners na mesma posição |
| Data de Início | Data/Hora | Ativação programada (opcional) |
| Data de Fim | Data/Hora | Desativação programada (opcional) |
| Status | Toggle | Ativo / Inativo (sobrepõe datas se necessário) |

---

### 9.5 Gestão de Páginas Institucionais

- Listagem de páginas com status (publicada / rascunho) e data de última atualização
- Criação de nova página com: título, slug, conteúdo (rich text), banner de capa, SEO
- Opção de vincular a página ao menu principal ou ao rodapé
- Publicar / despublicar com controle de status
- **Páginas pré-configuradas não deletáveis:** Quem Somos, Contato, Nossas Lojas
- **Páginas customizadas:** criação livre pelo administrador
- Editor WYSIWYG com suporte a: títulos, parágrafos, listas, imagens inline, links, tabelas

---

### 9.6 Gestão de Lojas e Unidades

| Campo | Tipo | Obrigatório |
|---|---|---|
| Nome da Unidade | Texto | Sim |
| Endereço Completo | Texto | Sim |
| Cidade / Bairro | Texto | Sim |
| Telefone | Texto | Sim |
| WhatsApp da Unidade | Texto | Não |
| E-mail da Unidade | Texto | Não |
| Horário de Funcionamento | Textarea | Sim |
| Coordenadas / Link Google Maps | Texto / URL | Não |
| Foto da Fachada / Unidade | Upload | Não |
| Descrição | Textarea | Não |
| Categorias de Destaque nesta Unidade | Seleção múltipla | Não |
| Ordem de Exibição | Número | Não |
| Status | Toggle | Sim |

---

### 9.7 Gestão de Menus e Rodapé

#### Gestão de Menus

- Interface visual para arrastar e soltar itens do menu (drag-and-drop)
- Itens podem ser: página interna, categoria, link externo ou separador
- Suporte a itens filhos (dropdown de segundo nível)
- Controle de visibilidade: mostrar/ocultar item sem excluir
- Configuração do mega menu: quais categorias aparecem, com ou sem banner
- Menu mobile gerado automaticamente a partir do menu desktop, com personalização opcional

#### Gestão do Rodapé

- Edição dos blocos de texto institucional (sobre a empresa)
- Gerenciamento dos links rápidos por bloco
- Dados de contato: telefone, e-mail, WhatsApp, endereço
- Links de redes sociais com ícones automáticos
- Horário de atendimento
- Texto de copyright editável
- Links legais: Política de Privacidade, Termos de Uso

---

### 9.8 Central de Contatos Comerciais

Módulo que centraliza os leads recebidos via formulários de contato do site, transformando o site em ferramenta comercial ativa.

| Campo | Descrição |
|---|---|
| Nome | Nome do contato que preencheu o formulário |
| E-mail | E-mail informado |
| Telefone | Telefone informado (se solicitado no formulário) |
| Mensagem | Texto livre enviado pelo visitante |
| Produto de Interesse | Produto vinculado (se originado de página de produto) |
| Origem | Página de origem do contato (URL ou nome da página) |
| Data/Hora | Timestamp do recebimento |
| Status | Novo / Em atendimento / Finalizado |
| Observação Interna | Campo livre para anotações da equipe comercial |

> 💡 A central deve enviar **notificação por e-mail** para o endereço configurado nas Configurações Gerais sempre que um novo contato for recebido.

---

## 10. Regras Funcionais e Restrições

| ID | Regra | Justificativa |
|---|---|---|
| RF-01 | O site **NÃO** deve ter carrinho de compras | O modelo de negócio é consultivo; carrinho cria expectativa errada |
| RF-02 | O site **NÃO** deve exibir preços (a menos que configurado) | Preços são negociados com o vendedor |
| RF-03 | Todo CTA de conversão deve levar a um canal de contato humano | A conversão se dá via vendedor, não via automação de compra |
| RF-04 | Produtos inativos não devem ser acessíveis via URL direta | Evita exibição de produtos descontinuados ou em revisão |
| RF-05 | Categorias sem produtos ativos devem exibir estado vazio | Evita experiência de categoria vazia sem orientação |
| RF-06 | Banners com data de fim vencida devem ser desativados automaticamente | Evita campanhas desatualizadas visíveis no site |
| RF-07 | Formulários de contato devem ter validação client-side e server-side | Garante integridade dos dados e previne spam |
| RF-08 | Imagens devem ter alt text configurável | Conformidade com WCAG e melhora de indexação SEO |
| RF-09 | URLs amigáveis (slugs) devem ser únicas e geradas automaticamente | Garante URLs limpas e sem conflito |
| RF-10 | O CMS deve ter controle de sessão com timeout automático | Segurança da área administrativa |
| RF-11 | Exclusão de categoria deve verificar se há produtos vinculados | Previne categorias órfãs ou produtos sem categoria |
| RF-12 | O CTA de WhatsApp deve incluir o nome do produto na mensagem | Melhora o contexto do atendimento comercial |

---

## 11. Requisitos Não Funcionais

| ID | Categoria | Requisito | Meta |
|---|---|---|---|
| RNF-01 | Performance | Largest Contentful Paint (LCP) | < 2,5 segundos |
| RNF-02 | Performance | First Input Delay (FID) | < 100ms |
| RNF-03 | Performance | Cumulative Layout Shift (CLS) | < 0,1 |
| RNF-04 | SEO | Score Lighthouse SEO | > 90 |
| RNF-05 | Acessibilidade | Score Lighthouse Accessibility | > 90 (WCAG AA) |
| RNF-06 | Segurança | HTTPS obrigatório em todo o site | 100% das páginas |
| RNF-07 | Segurança | Proteção contra XSS, CSRF e SQL Injection | Todos os formulários e endpoints |
| RNF-08 | Disponibilidade | Uptime mínimo | 99,5% ao mês |
| RNF-09 | Escalabilidade | Suporte a crescimento do catálogo | Até 10.000 produtos sem degradação |
| RNF-10 | SEO | Sitemap XML automático | Gerado e atualizado automaticamente |
| RNF-11 | SEO | Metatags configuráveis por página | Título, descrição, OG tags |
| RNF-12 | Analytics | Integração com Google Tag Manager | Pronto para configuração no lançamento |
| RNF-13 | Backup | Backup automático do banco de dados | Diário, com retenção de 30 dias |
| RNF-14 | Manutenibilidade | Documentação técnica do CMS | Manual do usuário entregue no lançamento |

---

## 12. Responsividade e Acessibilidade

### Breakpoints Obrigatórios

| Breakpoint | Largura | Dispositivo Alvo | Comportamentos Específicos |
|---|---|---|---|
| Mobile S | < 375px | Smartphones pequenos | Layout single-column, CTA fixo inferior |
| Mobile M | 375px – 767px | Smartphones padrão | Grid 2 colunas em cards, drawer menu |
| Tablet | 768px – 1023px | Tablets e iPads | Grid 3 colunas, mega menu simplificado |
| Desktop S | 1024px – 1279px | Notebooks | Grid 4 colunas, mega menu completo |
| Desktop L | 1280px+ | Monitores | Layout máximo, todas as features visíveis |

### Comportamentos Críticos no Mobile

- **Menu:** drawer lateral com animação suave; mega menu como accordion interno
- **Busca:** ícone na navbar → tela full de busca com teclado virtual
- **Cards de produto:** grid 2 colunas ou single column por breakpoint
- **Galeria de produto:** swipe horizontal nativo com indicadores de paginação
- **Formulários:** campos com height mínima de 44px (facilidade de toque)
- **CTA flutuante:** barra fixa inferior com botão WhatsApp full-width
- **Tabelas de especificações:** scroll horizontal com indicação visual
- **Banners hero:** versão específica para mobile com proporção vertical

### Requisitos de Acessibilidade (WCAG 2.1 AA)

- Contraste de cores mínimo de 4,5:1 para texto normal e 3:1 para texto grande
- Todos os elementos interativos acessíveis via teclado (`Tab`, `Enter`, `Esc`, Setas)
- Imagens com atributo `alt` descritivo e configurável
- Labels explícitas em todos os campos de formulário
- Hierarquia de headings consistente (H1 → H2 → H3) em todas as páginas
- Links e botões com texto descritivo (evitar "clique aqui" sem contexto)
- Foco visível em todos os elementos interativos
- ARIA labels em componentes customizados (modais, drawers, carrosséis)

---

## 13. Estados de Interface (UX States)

| Estado | Contexto | Comportamento Esperado |
|---|---|---|
| Loading / Carregando | Listagem de produtos, busca, envio de form | Skeleton screen ou spinner; nunca tela em branco |
| Empty State | Categoria/busca sem resultados | Ilustração + mensagem amigável + sugestões + CTA |
| Error State | Falha de carregamento ou API indisponível | Mensagem de erro clara + botão "tentar novamente" |
| Success State | Envio de formulário de contato | "Mensagem enviada! Em breve entraremos em contato." |
| Produto sem Imagem | Produto sem foto cadastrada | Placeholder visual com ícone de produto genérico |
| Categoria sem Produtos | Categoria recém-criada ou vazia | "Esta categoria ainda não possui produtos. Fale com um vendedor!" |
| Banner Inativo | Banner desativado no CMS | Não é exibido (invisível, sem deixar espaço vazio) |
| Página em Manutenção | Site fora do ar ou em deploy | Página estática com mensagem e previsão de retorno |
| Sessão Expirada (CMS) | Timeout de autenticação no admin | Redirecionamento para login com mensagem informativa |
| Formulário com Erro | Campos inválidos no envio | Mensagem inline, campo em vermelho, foco no primeiro erro |
| 404 — Não Encontrado | URL inválida ou produto removido | Página 404 customizada com busca e links para home/categorias |

---

## 14. Sitemap Completo

### Área Pública

| URL | Nome | Descrição |
|---|---|---|
| `/` | Home | Página inicial com hero, categorias, destaques, institucional e CTA |
| `/loja` | Loja / Catálogo | Listagem geral de produtos com filtros e ordenação |
| `/loja/[categoria]` | Página de Categoria | Produtos e subcategorias de uma categoria |
| `/loja/[categoria]/[subcategoria]` | Página de Subcategoria | Produtos de uma subcategoria específica |
| `/loja/[categoria]/[subcategoria]/[produto]` | Página de Produto | Detalhe completo do produto com CTAs |
| `/quem-somos` | Quem Somos | História, missão, valores e CTA institucional |
| `/nossas-lojas` | Nossas Lojas | Lista de todas as unidades |
| `/nossas-lojas/[unidade]` | Página da Unidade | Detalhe de uma unidade específica |
| `/contato` | Contato | Todos os canais de atendimento + formulário |
| `/busca` | Busca | Resultados de busca por termo |
| `/promocoes` | Promoções / Destaques | Produtos em destaque e campanhas (opcional) |
| `/[pagina-institucional]` | Páginas Customizadas | FAQ, Política de Privacidade, Termos, etc. |
| `/404` | 404 | Página de não encontrado customizada |

### Área Administrativa

| URL Admin | Nome | Função |
|---|---|---|
| `/admin/login` | Login | Autenticação do administrador |
| `/admin/dashboard` | Dashboard | Visão geral e atalhos rápidos |
| `/admin/produtos` | Produtos | Listagem, busca, filtros e ações |
| `/admin/produtos/novo` | Novo Produto | Formulário de cadastro |
| `/admin/produtos/[id]/editar` | Editar Produto | Formulário de edição |
| `/admin/categorias` | Categorias | CRUD de categorias |
| `/admin/subcategorias` | Subcategorias | CRUD de subcategorias |
| `/admin/banners` | Banners | Gestão de banners por posição |
| `/admin/paginas` | Páginas Institucionais | CRUD de páginas editáveis |
| `/admin/lojas` | Lojas / Unidades | CRUD de unidades físicas |
| `/admin/menus` | Menus | Editor de navegação do site |
| `/admin/rodape` | Rodapé | Configuração do footer |
| `/admin/contatos` | Central de Contatos | Leads recebidos via formulários |
| `/admin/configuracoes` | Configurações Gerais | Dados do site, SEO, integrações |

---

## 15. Prioridade de MVP e Roadmap

### Matriz de Priorização (MoSCoW)

#### 🔴 Must Have — MVP

- Home com hero, categorias, destaques e CTA
- Loja / Catálogo com grid e filtros básicos
- Páginas de Categoria e Subcategoria
- Página de Produto com galeria e CTAs
- Cabeçalho com mega menu e CTA
- Rodapé completo
- Botão flutuante de contato (WhatsApp)
- Página Quem Somos
- Página Nossas Lojas
- Página de Contato com formulário
- Busca com resultados
- CMS: Login e Dashboard
- CMS: CRUD de Produtos
- CMS: CRUD de Categorias e Subcategorias
- CMS: Gestão de Banners
- CMS: Páginas Institucionais
- CMS: Lojas / Unidades
- Responsividade completa (mobile / tablet / desktop)

#### 🟡 Should Have — MVP+

- Central de Contatos no CMS
- CMS: Gestão de Menus e Rodapé
- Página de Promoções / Destaques
- Autocomplete na busca
- Páginas institucionais customizadas (FAQ, Política)
- Notificação por e-mail de novo contato

#### 🟢 Could Have — Fase 2

- Página individual de unidade com mapa
- Integração com Google Analytics 4 via GTM
- Sitemap XML automático
- Ações em lote no CMS (ativar/inativar múltiplos)

#### ⚪ Won't Have (nesta fase)

- Carrinho de compras
- Checkout e pagamento online
- Login de cliente (área do cliente)
- Integração com ERP

### Roadmap de Fases

| Fase | Período Estimado | Entregas Principais |
|---|---|---|
| MVP | Meses 1–3 | Home, catálogo, produto, categorias, busca, institucional, CMS core, responsividade |
| MVP+ | Mês 4 | Central de contatos, gestão de menus/rodapé, promoções, notificações, FAQ |
| Fase 2 | Meses 5–6 | Analytics, SEO avançado, sitemap XML, melhorias de performance, página de unidade individual |
| Fase 3 | Mês 7+ | Blog/conteúdo, integrações externas (CRM, ERP), busca avançada, personalização |

---

## 16. Glossário

| Termo | Definição |
|---|---|
| CTA | Call to Action — elemento de interface que convida o usuário a realizar uma ação específica |
| CMS | Content Management System — sistema de gerenciamento de conteúdo (área administrativa) |
| Slug | Versão URL-friendly de um texto; ex: "Produto Exemplo" → `produto-exemplo` |
| Hero | Primeira seção de destaque visual de uma página, geralmente com banner grande |
| Mega Menu | Menu dropdown expandido com múltiplas colunas, imagens e links organizados |
| FAB | Floating Action Button — botão de ação flutuante fixo na tela |
| SKU | Stock Keeping Unit — código único de identificação de produto |
| Breadcrumb | Trilha de navegação hierárquica que mostra o caminho atual do usuário |
| LCP | Largest Contentful Paint — métrica de performance que mede velocidade de carregamento |
| WCAG | Web Content Accessibility Guidelines — diretrizes de acessibilidade web |
| LGPD | Lei Geral de Proteção de Dados — legislação brasileira de privacidade de dados |
| GTM | Google Tag Manager — ferramenta de gerenciamento de tags de analytics |
| SSR | Server-Side Rendering — renderização de páginas no servidor para melhor SEO |
| SPA | Single Page Application — aplicação web de página única com navegação dinâmica |
| MVP | Minimum Viable Product — versão mínima viável do produto para lançamento |
| Rich Text | Texto com formatação (negrito, itálico, listas, links) via editor WYSIWYG |
| OG Tags | Open Graph Tags — metatags que controlam como o link aparece em redes sociais |
| MoSCoW | Must / Should / Could / Won't — método de priorização de requisitos |

---

> **Nota:** Este documento é vivo e deve ser atualizado conforme o produto evolui. Qualquer alteração de escopo deve ser registrada com versão, data e responsável.
>
> **Próxima revisão:** Após aprovação do MVP com o time de produto e engenharia.