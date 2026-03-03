/**
 * Recommendation engine for "Recommended for You" section.
 * Scores products by similarity to the current product using:
 *   - Keyword overlap in the product name (highest weight)
 *   - Same category (medium weight)
 *   - Same diamond shape (low weight)
 */

interface ProductEntry {
  id: string;
  name: string;
  price: number;
  category: string;
  shape?: string;
  imageUrl?: string;
}

// Tokenise a product name into meaningful keywords (ignore filler words)
const STOP_WORDS = new Set(['the', 'a', 'an', 'and', 'of', 'for', 'in', 'de', 'ring', 'band', 'necklace', 'bracelet', 'earrings', 'studs', 'pendant', 'diamond']);

function tokenise(name: string): Set<string> {
  return new Set(
    name.toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 1 && !STOP_WORDS.has(w))
  );
}

// Core feature keywords that drive strong similarity
const FEATURE_GROUPS: Record<string, string[]> = {
  solitaire:  ['solitaire'],
  trilogy:    ['trilogy', 'three-stone', 'three', 'stone'],
  eternity:   ['eternity', 'half', 'pave', 'pavé', 'alternating'],
  orbit:      ['orbit', 'bezel'],
  heart:      ['heart'],
  cascade:    ['cascade', 'floating'],
  bar:        ['bar', 'curved'],
  clover:     ['clover'],
  cross:      ['cross'],
  five:       ['five'],
  signature:  ['signature', 'marquise'],
  classic:    ['classic'],
};

function getFeatureGroup(name: string): string | null {
  const lower = name.toLowerCase();
  for (const [group, keywords] of Object.entries(FEATURE_GROUPS)) {
    if (keywords.some(kw => lower.includes(kw))) return group;
  }
  return null;
}

function scoreProduct(current: ProductEntry, candidate: ProductEntry): number {
  if (current.id === candidate.id) return -1; // exclude self

  let score = 0;

  // 1. Same feature group (e.g. both "solitaire") — strongest signal
  const currentGroup = getFeatureGroup(current.name);
  const candidateGroup = getFeatureGroup(candidate.name);
  if (currentGroup && candidateGroup && currentGroup === candidateGroup) {
    score += 50;
  }

  // 2. Token overlap in product name
  const currentTokens = tokenise(current.name);
  const candidateTokens = tokenise(candidate.name);
  let overlap = 0;
  for (const t of currentTokens) {
    if (candidateTokens.has(t)) overlap++;
  }
  score += overlap * 20;

  // 3. Same category
  if (current.category.toLowerCase() === candidate.category.toLowerCase()) {
    score += 15;
  }

  // 4. Same shape
  if (current.shape && candidate.shape && current.shape === candidate.shape) {
    score += 8;
  }

  // 5. Small penalty for identical category + no name overlap (avoid generic same-cat spam)
  if (overlap === 0 && current.category.toLowerCase() === candidate.category.toLowerCase()) {
    score -= 5;
  }

  return score;
}

export function getRecommendations(
  currentId: string,
  allProducts: ProductEntry[],
  count = 4
): ProductEntry[] {
  const current = allProducts.find(p => p.id === currentId);
  if (!current) return allProducts.filter(p => p.id !== currentId).slice(0, count);

  return allProducts
    .map(p => ({ product: p, score: scoreProduct(current, p) }))
    .filter(({ score }) => score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ product }) => product);
}
