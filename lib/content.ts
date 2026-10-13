/**
 * Conteúdo do portfólio de Régis Gomes — textos, links e caminhos de imagem.
 * Os componentes só leem daqui: para atualizar o site, edite este arquivo.
 *
 * Imagens: ficam em /public/images/regis/{telas,murais,exposicoes} e são mapeadas no
 * objeto `img` mais abaixo (veja também LEIA-ME.txt naquela pasta).
 *
 * Fontes dos dados biográficos (consultadas em out/2026):
 * - Mapas Culturais MT, perfil do agente 2517
 * - g1 MT (jul/2014), Olhar Direto (jan/2014), Coisas de Mato Grosso (fev/2014)
 * - Tyrannus Melancholicus e Prefeitura de Cuiabá (jul/2014) — mostra "Nossa Cultura" no MISC
 * - HiperNotícias (dez/2015) — eleição para o Conselho Nacional de Política Cultural
 * - Prefeitura de Cuiabá (jun/2016) — mural "Arte Outside"
 */

/** Ano de referência para contagens ("há X anos"). Atualize junto com o copyright. */
const CURRENT_YEAR = 2026;
const FIRST_SALON_YEAR = 1990; // 1º Salão Jovem Arte Mato-grossense, aos 16 anos

export const site = {
  name: "Régis Gomes",
  /** TODO: troque pelo domínio definitivo do deploy na Vercel. */
  url: "https://regisgomes.vercel.app",
  description:
    "Portfólio de Régis Gomes (Cuiabá, 1974), artista plástico que pinta a cultura popular brasileira em telas, murais, painéis e nas ruas de Cuiabá.",
  keywords: [
    "Régis Gomes",
    "artista plástico",
    "Cuiabá",
    "Mato Grosso",
    "cultura popular",
    "arte regional",
    "siriri",
    "cururu",
    "murais",
  ],
  /** Deixe vazio se não houver perfil no X/Twitter. */
  twitter: "",
  /** E-mail de contato do artista (aparece no FAQ, no rodapé e na chamada final). */
  email: "regisgomes7@hotmail.com",
  copyrightYear: CURRENT_YEAR,
} as const;

const contactHref = `mailto:${site.email}`;
/** WhatsApp do artista — usado nos botões de encomenda. */
const whatsappHref = "https://wa.me/5565992089841";

/** Textos de interface usados pelos componentes (acessibilidade, rótulos, botões). */
export const ui = {
  lang: "pt-BR",
  locale: "pt_BR",
  skipLink: "Pular para o conteúdo",
  headerLabel: "Cabeçalho",
  homeLabel: `${site.name} — início`,
  menuOpen: "Abrir menu",
  menuClose: "Fechar menu",
  mobileNavLabel: "Menu",
  footerHeading: "Rodapé",
  footerNavLabel: "Links do rodapé",
  emailLabel: "Endereço de e-mail",
  subscribe: "Inscrever-se",
  themeGroup: "Tema",
  themeLight: "Claro",
  themeSystem: "Sistema",
  themeDark: "Escuro",
  backToTop: "Voltar ao topo",
  showcaseLabel: "Obras em destaque",
  promptSectionLabel: "Nas palavras do artista",
  storiesTabsLabel: "Exposições e projetos",
};

export type NavItem = { label: string; href: string };

/** Seções do menu do cabeçalho — os ids precisam bater com os ids das seções da página. */
export const mainNav: NavItem[] = [
  { label: "Obras", href: "#features" },
  { label: "Trajetória", href: "#benchmarks" },
  { label: "Exposições", href: "#stories" },
  { label: "Encomendas", href: "#pricing" },
];

export const headerCta = {
  signIn: { label: "Sobre", href: "#faq" },
  primary: { label: "Encomendar", href: "#pricing" },
};

export type FooterGroup = { title: string; links: (NavItem & { external?: boolean })[] };

export const press = {
  g1: "https://g1.globo.com/mato-grosso/noticia/2014/07/artista-expoe-telas-no-museu-da-imagem-e-do-som-de-cuiaba.html",
  olharDireto:
    "https://www.olhardireto.com.br/conceito/noticias/um-brasil-colorido-e-retratado-nas-telas-de-regis-gomes-na-exposicao-nossa-cultura",
  hnt: "https://www.hnt.com.br/cidades/artista-plastico-cuiabano-e-o-primeiro-mato-grossense-no-conselho-nacional-de-cultura/53020",
  prefeituraMural:
    "https://cuiaba.mt.gov.br/noticias/com-recursos-do-fundo-municipal-artista-plastico-retrata-tradicoes-em-muro-de-escola",
  mapas: "https://mapas.mt.gov.br/agente/2517/",
};

export const footerNav: FooterGroup[] = [
  {
    title: "Navegação",
    links: [
      { label: "Obras", href: "#features" },
      { label: "Trajetória", href: "#benchmarks" },
      { label: "Exposições", href: "#stories" },
      { label: "Encomendas", href: "#pricing" },
      { label: "Sobre", href: "#faq" },
    ],
  },
  {
    title: "Na imprensa",
    links: [
      { label: "g1 Mato Grosso", href: press.g1, external: true },
      { label: "Olhar Direto", href: press.olharDireto, external: true },
      { label: "HiperNotícias", href: press.hnt, external: true },
      { label: "Prefeitura de Cuiabá", href: press.prefeituraMural, external: true },
    ],
  },
  {
    title: "Perfis",
    links: [
      { label: "Mapas Culturais MT", href: press.mapas, external: true },
      { label: "E-mail", href: contactHref },
    ],
  },
];

export const footerLegal: NavItem[] = [{ label: "Voltar ao topo", href: "#top" }];

export const newsletter = {
  title: "Acompanhe o ateliê",
  description: "Novas obras, exposições e projetos de rua, de vez em quando.",
  placeholder: "seu@email.com",
  success: "Obrigado! Você vai receber as próximas novidades.",
};

export const systemStatus = `Em atividade desde ${FIRST_SALON_YEAR}`;

/* -------------------------------------------------------------------------- */
/*  Imagens                                                                   */
/* -------------------------------------------------------------------------- */

const IMG = "/images/regis";

/**
 * Fotos reais do artista. Alguns arquivos têm extensão .png mas são JPEG/WebP/AVIF
 * por dentro — o Next.js detecta o formato pelo conteúdo, então funcionam assim mesmo.
 * tela3.png e tela10.png são cópias menores da tela8.png e por isso não são usadas.
 */
const img = {
  /** Telas (pinturas). */
  rodaDeDanca: `${IMG}/telas/tela1.png`,
  capoeira: `${IMG}/telas/tela2.png`,
  baianas: `${IMG}/telas/tela5.png`,
  mascarados: `${IMG}/telas/tela6.png`,
  dancaDaFita: `${IMG}/telas/tela7.png`,
  violaDeCocho: `${IMG}/telas/tela8.png`,
  dancaIndigena: `${IMG}/telas/tela9.png`,
  /** Murais (Arte Outside, Escola Floriano Bocheneki). tela4.png é foto de mural. */
  muroCasario: `${IMG}/telas/tela4.png`,
  muralPintando: `${IMG}/murais/mural2.png`,
  muralAlunos: `${IMG}/murais/mural3.png`,
  muralPerspectiva: `${IMG}/murais/mural4.png`,
  muralAndaime: `${IMG}/murais/mural5.png`,
  muralCompleto: `${IMG}/murais/mural6.png`,
  muralTurma: `${IMG}/murais/mural7.png`,
  muralEscola: `${IMG}/murais/mural8.png`,
  /** Exposições — fotos da mostra "Nossa Cultura" no MISC. */
  misc1: `${IMG}/exposicoes/misc1.png`,
  misc2: `${IMG}/exposicoes/misc2.png`,
  misc3: `${IMG}/exposicoes/misc3.png`,
  /**
   * TODO: quando tiver as fotos, salve em exposicoes/ com estes nomes e troque os
   * usos de `img.violaDeCocho`/`img.mascarados` nas abas de Nova York e da Assembleia:
   * - exposicoes/casa-brasil-nova-york.jpg
   * - exposicoes/assembleia-legislativa.jpg
   */
};

// TODO: troque os textos alternativos pelos títulos reais das obras.
const telas = [
  { src: img.violaDeCocho, alt: "Pintura de Régis Gomes: viola de cocho e dançarinos de siriri" },
  { src: img.muralCompleto, alt: "Mural de Régis Gomes com viola de cocho, Pantanal e cerâmica" },
  { src: img.mascarados, alt: "Pintura de Régis Gomes: mascarados" },
  { src: img.muralPintando, alt: "Régis Gomes pintando um mural" },
  { src: img.rodaDeDanca, alt: "Pintura de Régis Gomes: roda de música e dança" },
  { src: img.muroCasario, alt: "Mural de Régis Gomes com casario e frutas" },
  { src: img.capoeira, alt: "Pintura de Régis Gomes: capoeira e baiana" },
  { src: img.muralPerspectiva, alt: "Mural de Régis Gomes no muro de uma escola" },
  { src: img.dancaDaFita, alt: "Pintura de Régis Gomes: dança da fita com mascarados" },
  { src: img.muralAlunos, alt: "Alunos diante do mural de Régis Gomes" },
  { src: img.baianas, alt: "Pintura de Régis Gomes: baianas em festa de santo" },
  { src: img.muralAndaime, alt: "Régis Gomes pintando um mural sobre o andaime" },
  { src: img.dancaIndigena, alt: "Pintura de Régis Gomes: dança indígena" },
  { src: img.muralTurma, alt: "Turma de alunos em frente ao mural de Régis Gomes" },
  { src: img.muralEscola, alt: "Alunos e professores diante do mural da escola" },
];

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export const hero = {
  titleLines: ["As cores do Brasil,", "pintadas em Cuiabá."],
  eyebrow: "Régis Gomes · artista plástico · Cuiabá, 1974",
  description:
    "Uma pintura que transborda das telas para muros, postes e painéis, celebrando o siriri, o cururu, os mascarados e as festas populares do país.",
  cta: { label: "Conheça as obras", href: "#features" },
  images: telas,
};

/* -------------------------------------------------------------------------- */
/*  Fala do artista (revelada palavra a palavra)                              */
/* -------------------------------------------------------------------------- */

export const promptReveal = {
  /** Fala de Régis Gomes ao g1 Mato Grosso (jul/2014), reproduzida literalmente. */
  prompt: "“Quando eu vejo a minha tela está pronta e ela sempre vem com essas cores vibrantes.”",
  image: {
    src: img.violaDeCocho,
    alt: "Pintura de Régis Gomes: viola de cocho e dançarinos de siriri",
  },
  /** Aparece no canto inferior da imagem quando ela ocupa a tela. */
  caption: "Régis Gomes ao g1 Mato Grosso, 2014",
  /** Título que surge no fundo escuro quando a imagem sai. */
  nextTitle: "Doze festas, uma só paleta.",
};

/* -------------------------------------------------------------------------- */
/*  Grade de obras (VariationsGrid)                                           */
/* -------------------------------------------------------------------------- */

export const variations = {
  /** Visualmente oculto aqui — a mesma frase fecha a seção anterior. */
  title: "Doze festas, uma só paleta.",
  caption: "Manifestações que atravessam a obra — de Mato Grosso à Bahia, de Pernambuco ao Pará.",
  /** Imagem usada por qualquer célula sem `src` próprio. */
  image: {
    src: img.violaDeCocho,
    alt: "Pintura de Régis Gomes",
  },
  /** Célula destacada no fim da sequência (índice no array `cells`). */
  favoriteIndex: 5,
  favoriteLabel: "Destaque",
  /** Fase de saída: a obra em destaque cresce até o centro da tela. */
  exitTitle: "Uma festa em cada tela.",
  exitCaption: "Acrílica sobre tela, com tecido chitão e adereços aplicados em relevo.",
  /**
   * 12 obras (7 telas + 5 murais). A primeira fica no topo da pilha; os rótulos
   * precisam ser únicos (são usados como chave).
   * `filter: "none"` mantém as cores originais das pinturas.
   * TODO: ajuste cada rótulo para o título real da obra correspondente.
   */
  cells: [
    { label: "Roda de dança", src: img.rodaDeDanca, filter: "none" },
    { label: "Capoeira", src: img.capoeira, filter: "none" },
    { label: "Mascarados", src: img.mascarados, filter: "none" },
    { label: "Mural Arte Outside", src: img.muralCompleto, filter: "none" },
    { label: "Baianas", src: img.baianas, filter: "none" },
    { label: "Viola de cocho", src: img.violaDeCocho, filter: "none" },
    { label: "Dança da fita", src: img.dancaDaFita, filter: "none" },
    { label: "Muro do casario", src: img.muroCasario, filter: "none" },
    { label: "Dança indígena", src: img.dancaIndigena, filter: "none" },
    { label: "Mural na escola", src: img.muralPerspectiva, filter: "none" },
    { label: "Pintura ao vivo", src: img.muralPintando, filter: "none" },
    { label: "No andaime", src: img.muralAndaime, filter: "none" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Suportes (Formats)                                                        */
/* -------------------------------------------------------------------------- */

export const formats = {
  title: "A pintura como campo ampliado.",
  description:
    "Da tela para a rua: muros, painéis, postes e fachadas viram suporte para a mesma linguagem de cores fortes e cultura popular.",
  /** Imagem usada por qualquer item sem `src` próprio. */
  image: {
    src: img.muralCompleto,
    alt: "Obra de Régis Gomes",
  },
  items: [
    { label: "Muro", ratio: "16:9", w: 16, h: 9, focus: "50% 50%", src: img.muralCompleto },
    { label: "Tela", ratio: "1:1", w: 1, h: 1, focus: "50% 50%", src: img.dancaDaFita },
    // TODO: sem fotos de painel e poste ainda — trocar quando houver.
    { label: "Painel", ratio: "4:5", w: 4, h: 5, focus: "75% 50%", src: img.misc1 },
    { label: "Poste", ratio: "9:16", w: 9, h: 16, focus: "40% 50%", src: img.muralAndaime },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Exposições (Stories)                                                      */
/* -------------------------------------------------------------------------- */

export const stories = {
  title: "Onde a obra já esteve.",
  description: "Mostras e intervenções que levaram a cultura popular para museus, galerias e escolas.",
  /** Intervalo de troca automática, em ms. */
  interval: 7000,
  items: [
    {
      company: "Nova York",
      quote:
        "Ao lado de outros quatro artistas mato-grossenses, levou suas telas para a mostra coletiva “As Cores do Pantanal”, na Casa Brasil.",
      /** false = texto descritivo (sem aspas). Use true apenas para falas reais. */
      cite: false,
      name: "As Cores do Pantanal",
      byline: "Casa Brasil, Nova York · 2013",
      // TODO: trocar por exposicoes/casa-brasil-nova-york.jpg quando houver a foto.
      image: img.violaDeCocho,
      imageAlt: "Pintura de Régis Gomes",
      caption: "As Cores do Pantanal · Nova York",
    },
    {
      company: "Assembleia Legislativa",
      quote:
        "Dezoito pinturas e colagens sobre tela reuniram o siriri, o chorado de Vila Bela, os mascarados de Poconé, o frevo e o carimbó.",
      cite: false,
      name: "Cultura Popular Nacional",
      byline: "Instituto Memória da Assembleia Legislativa de MT · 2014",
      // TODO: trocar por exposicoes/assembleia-legislativa.jpg quando houver a foto.
      image: img.mascarados,
      imageAlt: "Pintura de Régis Gomes: mascarados",
      caption: "Cultura Popular Nacional · Cuiabá",
    },
    {
      company: "MISC",
      quote:
        "Dezessete telas em acrílica, com chitão e adereços aplicados, levaram samba, capoeira, Olodum e tradições indígenas ao Museu da Imagem e do Som.",
      cite: false,
      name: "Nossa Cultura",
      byline: "Museu da Imagem e do Som de Cuiabá · 2014",
      image: img.misc3,
      imageAlt: "Exposição Nossa Cultura no Museu da Imagem e do Som de Cuiabá",
      caption: "Nossa Cultura · MISC, Cuiabá",
    },
    {
      company: "Arte Outside",
      quote:
        "Com apoio do Fundo Municipal de Cultura, o muro de uma escola no Parque Atalaia ganhou viola de cocho, cururu, Pantanal e a cerâmica de São Gonçalo Beira Rio.",
      cite: false,
      name: "Arte Outside",
      byline: "Escola Municipal Floriano Bocheneki, Cuiabá · 2016",
      image: img.muralEscola,
      imageAlt: "Alunos diante do mural Arte Outside na Escola Municipal Floriano Bocheneki",
      caption: "Arte Outside · mural em Cuiabá",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Encomendas (Pricing)                                                      */
/* -------------------------------------------------------------------------- */

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  /** Número = valor numérico com moeda; texto = exibido como está (ex.: "Sob consulta"). */
  monthly: number | string;
  annual: number | string;
  allowance: string;
  allowanceNote: string;
  thumb: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
};

export const pricing = {
  title: "Telas, murais e projetos sob encomenda.",
  description:
    "Obras originais, intervenções em muros e fachadas e ações de formação em cultura popular. Cada projeto é combinado diretamente com o artista.",
  billingGroupLabel: "Tipo de cliente",
  /** Rótulos do seletor (antes "mensal/anual"). */
  billingLabels: { monthly: "Particulares", annual: "Instituições" },
  /** Desconto exibido no seletor; 0 esconde o selo. */
  annualDiscount: 0,
  currency: "R$",
  priceSuffix: "",
  billedNote: { monthly: "Valores combinados por projeto", annual: "Propostas para editais e parcerias" },
  includesLabel: "Inclui",
  featuredBadge: "Arte de rua",
  plans: [
    {
      id: "telas",
      name: "Telas",
      tagline: "Obras originais em acrílica.",
      monthly: "Sob consulta",
      annual: "Sob consulta",
      allowance: "Acrílica sobre tela",
      allowanceNote: "Com chitão e adereços em relevo",
      thumb: img.violaDeCocho,
      features: [
        "Obras disponíveis do acervo",
        "Encomendas por tema",
        "Cultura popular regional e brasileira",
        "Cores fortes e relevo",
      ],
      cta: "Consultar uma tela",
      ctaHref: whatsappHref,
    },
    {
      id: "murais",
      name: "Murais e painéis",
      tagline: "Muros, fachadas, postes e painéis.",
      monthly: "Sob consulta",
      annual: "Sob consulta",
      allowance: "Pintura in loco",
      allowanceNote: "Escolas, comércios e espaços públicos",
      thumb: img.muralCompleto,
      features: [
        "Pesquisa do tema com a comunidade",
        "Projeto e esboço",
        "Execução no local",
        "Experiência com projetos de fundo público",
      ],
      cta: "Pedir orçamento de mural",
      ctaHref: whatsappHref,
      featured: true,
    },
    {
      id: "formacao",
      name: "Oficinas e palestras",
      tagline: "Cultura popular em sala e na rua.",
      monthly: "Sob consulta",
      annual: "Sob consulta",
      allowance: "Formação",
      allowanceNote: "Escolas, coletivos e eventos",
      thumb: img.muralAlunos,
      features: [
        "Palestras sobre cuiabania",
        "Oficinas de pintura",
        "Cultura afro-brasileira, capoeira e percussão",
        "Formatos para editais",
      ],
      cta: "Agendar uma conversa",
      ctaHref: whatsappHref,
    },
  ] satisfies Plan[],
  enterprise: {
    title: "Instituições",
    description:
      "Primeiro mato-grossense eleito para o Conselho Nacional de Política Cultural, Régis desenvolve projetos com museus, escolas e editais públicos.",
    cta: { label: "Falar com o artista", href: whatsappHref },
    features: [
      "Projetos para editais",
      "Murais em escolas",
      "Exposições em museus",
      "Cultura afro-brasileira",
      "Pesquisa em cultura popular",
      "Produção cultural",
      "Arte de rua",
      "Ações de formação",
    ],
    images: [
      img.misc1,
      img.misc2,
      img.misc3,
    ],
  },
  footnote: "Valores e prazos definidos caso a caso, conforme dimensões, suporte e local.",
};

/* -------------------------------------------------------------------------- */
/*  Sobre (FAQ)                                                               */
/* -------------------------------------------------------------------------- */

export const faq = {
  title: "Sobre o artista.",
  description: "Quer saber mais sobre obras, encomendas ou exposições? Escreva para",
  items: [
    {
      q: "Quem é Régis Gomes?",
      a: "Artista plástico nascido em Cuiabá em 1974, autodidata, com uma trajetória dedicada à cultura popular regional e brasileira. Atua nas artes visuais, na arte de rua e na produção cultural.",
    },
    {
      q: "Como começou a pintar?",
      a: "Ainda na escola participava de concursos de desenho e criava histórias em quadrinhos. Aos 16 anos expôs no 1º Salão Jovem Arte Mato-grossense e passou a frequentar o Ateliê Livre da Fundação Cultural, com orientação da artista Osvaldina dos Santos.",
    },
    {
      q: "Quais técnicas e materiais usa?",
      a: "Principalmente tinta acrílica, em cores fortes. Em muitas telas aplica tecido chitão e objetos reais — fitas, colares, plumas — que criam relevo e remetem às festas retratadas.",
    },
    {
      q: "Que temas aparecem nas obras?",
      a: "Siriri, cururu, viola de cocho, mascarados de Poconé, chorado de Vila Bela, boi-à-serra e festas de santo, ao lado do frevo, do samba, da capoeira, do Olodum, do carimbó e de tradições indígenas.",
    },
    {
      q: "Onde já expôs?",
      a: "Na Casa Brasil, em Nova York, com a mostra coletiva As Cores do Pantanal; e, em Cuiabá, na Galeria da Secretaria de Estado de Cultura, no Instituto Memória da Assembleia Legislativa, no Museu do Rio e no Museu da Imagem e do Som, entre outros espaços.",
    },
    {
      q: "Qual a ligação com as políticas culturais?",
      a: "Em 2015 foi eleito, no Fórum Nacional Setorial, o primeiro mato-grossense a integrar o Conselho Nacional de Política Cultural. Também atua há décadas com cultura afro — capoeira e percussão — e integra a Companhia de Dança e Teatro Ayoluwá.",
    },
    {
      q: "Como encomendar uma obra ou um mural?",
      a: "Envie um e-mail contando o tipo de projeto, o local e o prazo desejado. Telas, murais, painéis e oficinas são combinados diretamente com o artista.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Chamada final (onda de imagens)                                           */
/* -------------------------------------------------------------------------- */

export const finalCta = {
  title: ["A cultura do Brasil,", "pintada a partir de Cuiabá."],
  description: "Telas, murais e projetos que levam a festa popular para galerias, escolas e ruas.",
  primary: { label: "Ver as obras", href: "#features" },
  secondary: { label: "Fale com o artista", href: contactHref },
  /** A onda reutiliza as mesmas obras do carrossel do topo. */
  images: telas,
};

/* -------------------------------------------------------------------------- */
/*  Trajetória (Benchmarks) — apenas dados verificados nas fontes             */
/* -------------------------------------------------------------------------- */

const yearsSince = (year: number) => CURRENT_YEAR - year;

export const benchmarks = {
  title: "Mais de três décadas pintando a cultura popular.",
  description:
    "Do primeiro salão, ainda adolescente, aos museus de Cuiabá, a Nova York e ao Conselho Nacional de Política Cultural.",
  headline: {
    value: yearsSince(FIRST_SALON_YEAR),
    /** Valor inicial da contagem animada. */
    from: 0,
    unit: "anos",
    label: "de trajetória nas artes plásticas",
    description:
      "Contados desde 1990, quando expôs no 1º Salão Jovem Arte Mato-grossense, aos 16 anos. Ao lado, role a página e acompanhe um mural ganhar vida, pincelada a pincelada.",
    /** Timelapse controlado pelo scroll (16:9, sem áudio). */
    video: {
      src: "/videos/timelapse.mp4",
      label: "Timelapse de Régis Gomes pintando um mural",
    },
  },
  stats: [
    { value: 3, suffix: "", label: "mostras em Cuiabá só em 2014: SEC-MT, Assembleia Legislativa e MISC" },
    { value: 1, suffix: "º", label: "mato-grossense eleito para o Conselho Nacional de Política Cultural (2015)" },
    { value: 420, suffix: "+", label: "alunos da escola que recebeu o mural Arte Outside (2016)" },
  ],
  comparison: {
    title: "Marcos da trajetória.",
    description: "Anos decorridos desde cada marco, em escala logarítmica.",
    /** `seconds` guarda a quantidade (aqui, anos) — o gráfico só usa o número. */
    items: [
      { label: "1º Salão Jovem Arte", seconds: yearsSince(1990), display: `1990 · ${yearsSince(1990)} anos`, highlight: true },
      { label: "Casa Brasil, NY", seconds: yearsSince(2013), display: `2013 · ${yearsSince(2013)} anos` },
      { label: "Conselho Nacional", seconds: yearsSince(2015), display: `2015 · ${yearsSince(2015)} anos` },
      { label: "Mural Arte Outside", seconds: yearsSince(2016), display: `2016 · ${yearsSince(2016)} anos` },
    ],
    ticks: [
      { label: "1 ano", seconds: 1 },
      { label: "5 anos", seconds: 5 },
      { label: "10 anos", seconds: 10 },
      { label: "20 anos", seconds: 20 },
      { label: "40 anos", seconds: 40 },
    ],
    /** Borda esquerda do eixo. */
    minSeconds: 1,
  },
};
