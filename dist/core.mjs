export const LABELS = { supported: 'Supported', inferred: 'Inferred', unknown: 'Unknown', conflict: 'Conflict' };

export function validateReport(input) {
  const fail = message => { throw new Error(message); };
  if (!input || input.format !== 'renter-edge-report' || input.version !== 1) {
    fail('Choose a Renter Edge report (version 1). Research evidence packets need to be converted to the report format first.');
  }
  const string = (value, label, max = 2000) => {
    if (typeof value !== 'string' || !value.trim() || value.length > max) fail(`${label} must be text of 1–${max} characters.`);
    return value;
  };
  const list = (value, label, max) => {
    if (!Array.isArray(value) || value.length > max) fail(`${label} must be a list with at most ${max} items.`);
    return value;
  };
  const amount = (value, label, max = 1000000) => {
    if (value === null) return null;
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > max) fail(`${label} must be a nonnegative number or null for unknown.`);
    return value;
  };
  const url = value => {
    if (value === null) return null;
    string(value, 'Source URL');
    try { const parsed = new URL(value); if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) fail('Source links must be public HTTP or HTTPS URLs without credentials.'); }
    catch { fail('Source links must be public HTTP or HTTPS URLs without credentials.'); }
    return value;
  };
  if (typeof input.fictional !== 'boolean') fail('Report must explicitly say whether it is fictional.');
  if (!input.property || !input.costs) fail('Report needs property and costs sections.');
  const sources = list(input.sources, 'Sources', 30).map(s => {
    if (!s || typeof s !== 'object') fail('Each source must be an object.');
    return { id: string(s.id, 'Source ID', 60), title: string(s.title, 'Source title', 200), type: string(s.type, 'Source type', 100), url: url(s.url), captured: string(s.captured, 'Source capture date', 150), excerpt: string(s.excerpt, 'Source excerpt', 4000) };
  });
  const ids = new Set(sources.map(s => s.id));
  if (ids.size !== sources.length) fail('Each source needs a unique ID.');
  const references = (value, label, requireSource = false) => {
    const refs = list(value, label, 30);
    if (refs.some(id => typeof id !== 'string' || !ids.has(id))) fail(`${label} points to a source that is missing.`);
    if (requireSource && !refs.length) fail(`${label} needs at least one source.`);
    return [...new Set(refs)];
  };
  const findings = list(input.findings, 'Findings', 30).map(f => {
    if (!f || !Object.hasOwn(LABELS, f.level)) fail('Each finding needs a valid evidence label.');
    return { level: f.level, title: string(f.title, 'Finding title', 200), detail: string(f.detail, 'Finding explanation'), sourceIds: references(f.sourceIds, 'Finding sources', f.level === 'supported' || f.level === 'conflict') };
  });
  const costs = {};
  for (const key of ['gross', 'amenity', 'deposit', 'application', 'freeMonths', 'termMonths']) costs[key] = amount(input.costs[key], key, key.endsWith('Months') ? 120 : 1000000);
  if (costs.termMonths === 0) fail('Lease term must be greater than zero or null.');
  if (costs.termMonths !== null && costs.freeMonths !== null && costs.freeMonths > costs.termMonths) fail('Free months cannot exceed the lease term.');
  costs.unknowns = list(input.costs.unknowns, 'Unknown costs', 15).map(v => string(v, 'Unknown cost', 150));
  costs.sourceIds = references(input.costs.sourceIds, 'Cost sources', Object.values(costs).some(v => typeof v === 'number'));
  costs.note = string(input.costs.note, 'Cost note');
  return {
    format: input.format, version: 1, fictional: input.fictional,
    id: string(input.id, 'Report ID', 100), title: string(input.title, 'Report title', 200), scenario: string(input.scenario, 'Scenario', 100),
    prepared: string(input.prepared, 'Report date', 150), summary: string(input.summary, 'Summary'), verdict: string(input.verdict, 'Review status', 100),
    property: { name: string(input.property.name, 'Property name', 200), area: string(input.property.area, 'Area', 200), unit: string(input.property.unit, 'Unit', 60), layout: string(input.property.layout, 'Layout', 150), availability: string(input.property.availability, 'Availability', 250) },
    costs, sources, findings, questions: list(input.questions, 'Questions', 30).map(q => string(q, 'Question', 1000))
  };
}

export function calculateCosts(costs, count = 1) {
  if (!Number.isInteger(count) || count < 1 || count > 6) throw new Error('Choose 1–6 applicants / leaseholders.');
  const round = value => Math.round((value + Number.EPSILON) * 100) / 100;
  const subtotal = values => values.every(v => v === null) ? null : round(values.reduce((a, b) => a + (b ?? 0), 0));
  const monthly = subtotal([costs.gross, costs.amenity === null ? null : costs.amenity * count]);
  const upfront = subtotal([costs.gross, costs.deposit, costs.application === null ? null : costs.application * count]);
  const net = costs.gross !== null && costs.freeMonths !== null && costs.termMonths !== null && costs.termMonths > 0
    ? round(costs.gross * (costs.termMonths - costs.freeMonths) / costs.termMonths) : null;
  const unknowns = [...costs.unknowns];
  if (costs.gross === null) unknowns.push('Gross rent');
  if (costs.amenity === null) unknowns.push('Amenity fee');
  if (costs.deposit === null) unknowns.push('Security deposit');
  if (costs.application === null) unknowns.push('Application fee');
  return { monthly, upfront, net, unknowns: [...new Set(unknowns)] };
}

export function budgetMessage(monthly, budget, hasUnknowns) {
  if (budget === null) return 'Add a monthly budget to compare the known charges.';
  if (monthly === null) return 'Not enough cost information to compare with your budget.';
  const delta = Math.round(Math.abs(monthly - budget));
  if (monthly > budget) return `Known charges are $${delta.toLocaleString('en-US')} over your monthly budget.`;
  return `Known charges leave $${delta.toLocaleString('en-US')} in your monthly budget.${hasUnknowns ? ' Other costs still need confirmation.' : ''}`;
}
