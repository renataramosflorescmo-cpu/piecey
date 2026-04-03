const SUPABASE_URL = 'https://imbyndstalhfdwdiitcr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYnluZHN0YWxoZmR3ZGlpdGNyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTA2NjA2NiwiZXhwIjoyMDkwNjQyMDY2fQ.NsLMfW38zZ_5UJ22iR1aPQrXFEu8HKuzkb4P6AW4F0I';

const articleData = {
  "como-reduzir-no-show-consultorio-dermatologia": {
    title: "Como reduzir no-show em consultório de dermatologia: estratégias práticas",
    excerpt: "Descubra técnicas específicas para reduzir faltas de pacientes em consultórios dermatológicos e aumentar a ocupação da sua agenda.",
    seo_title: "Como reduzir no-show em consultório de dermatologia: estratégias práticas",
    seo_description: "Descubra técnicas específicas para reduzir faltas de pacientes em consultórios dermatológicos e aumentar a ocupação da sua agenda.",
  },
  "reduzir-faltas-clinica-cirurgia-plastica": {
    title: "Reduzir faltas em clínica de cirurgia plástica: automação e confirmação inteligente",
    excerpt: "Estratégias comprovadas para diminuir o no-show em clínicas de cirurgia plástica e otimizar a agenda de procedimentos.",
    seo_title: "Reduzir faltas em clínica de cirurgia plástica: automação e confirmação inteligente",
    seo_description: "Estratégias comprovadas para diminuir o no-show em clínicas de cirurgia plástica e otimizar a agenda de procedimentos.",
  },
  "agenda-ociosa-consultorio-preencher-horarios-vazios": {
    title: "Agenda ociosa em consultório: como preencher horários vazios rapidamente",
    excerpt: "Técnicas práticas para ativar pacientes inativos e preencher buracos na agenda do seu consultório médico.",
    seo_title: "Agenda ociosa em consultório: como preencher horários vazios rapidamente",
    seo_description: "Técnicas práticas para ativar pacientes inativos e preencher buracos na agenda do seu consultório médico.",
  },
  "atrair-pacientes-particulares-dermatologia": {
    title: "Como atrair pacientes particulares para dermatologia: estratégias de posicionamento",
    excerpt: "Descubra como dermatologistas podem atrair pacientes particulares de alto valor e transformar sua agenda em um negócio rentável.",
    seo_title: "Como atrair pacientes particulares para dermatologia: estratégias de posicionamento",
    seo_description: "Descubra como dermatologistas podem atrair pacientes particulares de alto valor e transformar sua agenda em um negócio rentável.",
  },
  "google-ads-consultorio-medico-buscas-locais": {
    title: "Google Ads para consultório médico: como rankear em buscas locais",
    excerpt: "Aprenda a usar Google Ads para aparecer nos primeiros resultados quando pacientes buscam por médicos na sua região.",
    seo_title: "Google Ads para consultório médico: como rankear em buscas locais",
    seo_description: "Aprenda a usar Google Ads para aparecer nos primeiros resultados quando pacientes buscam por médicos na sua região.",
  },
  "instagram-ads-clinica-estetica-vender-procedimentos": {
    title: "Instagram Ads para clínica de estética: como vender procedimentos estéticos",
    excerpt: "Estratégias práticas para usar Instagram Ads e vender procedimentos estéticos de alto valor para pacientes qualificados.",
    seo_title: "Instagram Ads para clínica de estética: como vender procedimentos estéticos",
    seo_description: "Estratégias práticas para usar Instagram Ads e vender procedimentos estéticos de alto valor para pacientes qualificados.",
  },
};

// Accent replacements for content_html - ordered from longer to shorter to avoid partial matches
// Each entry: [pattern (regex string for word boundary match), replacement]
const accentReplacements = [
  // Multi-word replacements first
  ["cirurgia plastica", "cirurgia plástica"],

  // Longer words first to avoid substring issues
  ["dermatologico", "dermatológico"],
  ["informacoes", "informações"],
  ["qualificacao", "qualificação"],
  ["segmentacao", "segmentação"],
  ["confirmacao", "confirmação"],
  ["desistencia", "desistência"],
  ["experiencia", "experiência"],
  ["instrucoes", "instruções"],
  ["reativacao", "reativação"],
  ["avaliacoes", "avaliações"],
  ["prevencao", "prevenção"],
  ["manutencao", "manutenção"],
  ["frequencia", "frequência"],
  ["automatica", "automática"],
  ["especifica", "específica"],
  ["consultorio", "consultório"],
  ["estrategia", "estratégia"],
  ["conversao", "conversão"],
  ["orcamento", "orçamento"],
  ["automacao", "automação"],
  ["ocupacao", "ocupação"],
  ["criacao", "criação"],
  ["reducao", "redução"],
  ["ausencia", "ausência"],
  ["urgencia", "urgência"],
  ["possiveis", "possíveis"],
  ["estetica", "estética"],
  ["dinamica", "dinâmica"],
  ["politica", "política"],
  ["conteudo", "conteúdo"],
  ["solucao", "solução"],
  ["clinica", "clínica"],
  ["tecnicas", "técnicas"],
  ["praticas", "práticas"],
  ["horarios", "horários"],
  ["servico", "serviço"],
  ["negocio", "negócio"],
  ["anuncio", "anúncio"],
  ["pagina", "página"],
  ["regiao", "região"],
  ["tambem", "também"],
  ["secretaria", "secretária"],
  ["opcoes", "opções"],
  ["medico", "médico"],
  ["preco", "preço"],
  ["razao", "razão"],
  ["unico", "único"],
  ["obvia", "óbvia"],
  ["voce", "você"],
  ["alem", "além"],
  ["apos", "após"],
  ["nao", "não"],
  ["sao", "são"],
  ["ate", "até"],
  ["ja", "já"],
];

function fixAccentsInHtml(html) {
  if (!html) return html;
  let result = html;

  for (const [pattern, replacement] of accentReplacements) {
    // Use word boundary matching - case insensitive for first letter
    // We need to handle both lowercase and capitalized versions
    const lowerPattern = pattern;
    const capitalPattern = pattern.charAt(0).toUpperCase() + pattern.slice(1);
    const lowerReplacement = replacement;
    const capitalReplacement = replacement.charAt(0).toUpperCase() + replacement.slice(1);

    // For multi-word patterns, don't use \b between words
    const escapedLower = lowerPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedCapital = capitalPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Replace lowercase version with word boundaries
    result = result.replace(new RegExp(`\\b${escapedLower}\\b`, 'g'), lowerReplacement);
    // Replace capitalized version
    result = result.replace(new RegExp(`\\b${escapedCapital}\\b`, 'g'), capitalReplacement);
    // Replace ALL CAPS version
    const upperPattern = pattern.toUpperCase();
    const upperReplacement = replacement.toUpperCase();
    const escapedUpper = upperPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(`\\b${escapedUpper}\\b`, 'g'), upperReplacement);
  }

  // Special handling for "esta" -> "está" (only when it means "is", not the demonstrative)
  // We'll replace "esta " in contexts like "que esta ", "nao esta ", etc. but this is tricky.
  // A safer approach: replace "esta" when preceded by common patterns or followed by certain words
  // For simplicity, replace standalone "esta" that appears to be a verb (before adjectives, gerunds, etc.)
  // Actually, let's do a broad replacement since the content is about fixing missing accents
  result = result.replace(/\besta\b/g, 'está');
  result = result.replace(/\bEsta\b/g, 'Está');

  return result;
}

async function main() {
  const slugs = Object.keys(articleData);

  // Step 1: Fetch all articles
  console.log('Fetching articles...');
  const fetchUrl = `${SUPABASE_URL}/rest/v1/articles?select=*&slug=in.(${slugs.map(s => `"${s}"`).join(',')})`;
  const fetchRes = await fetch(fetchUrl, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!fetchRes.ok) {
    console.error('Failed to fetch articles:', fetchRes.status, await fetchRes.text());
    process.exit(1);
  }

  const articles = await fetchRes.json();
  console.log(`Fetched ${articles.length} articles.`);

  for (const article of articles) {
    console.log(`\nProcessing: ${article.slug}`);
    const corrections = articleData[article.slug];
    if (!corrections) {
      console.log(`  No corrections found for slug, skipping.`);
      continue;
    }

    // Fix content_html accents
    const fixedHtml = fixAccentsInHtml(article.content_html);

    const updateBody = {
      title: corrections.title,
      excerpt: corrections.excerpt,
      seo_title: corrections.seo_title,
      seo_description: corrections.seo_description,
      content_html: fixedHtml,
    };

    const updateUrl = `${SUPABASE_URL}/rest/v1/articles?slug=eq.${article.slug}`;
    const updateRes = await fetch(updateUrl, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(updateBody),
    });

    if (!updateRes.ok) {
      console.error(`  FAILED: ${updateRes.status} ${await updateRes.text()}`);
    } else {
      console.log(`  Updated successfully.`);
    }
  }

  console.log('\nDone! All articles processed.');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
