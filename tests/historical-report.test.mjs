import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validateReport, calculateCosts } from '../dist/core.mjs';
const report = JSON.parse(await readFile(new URL('../reports/180-water-312.report.json', import.meta.url)));
const evidence = JSON.parse(await readFile(new URL('../research/180-water-312.evidence.json', import.meta.url)));

test('historical report survives viewer validation without losing source provenance', () => {
  assert.deepEqual(validateReport(report), report);
  assert.equal(report.fictional, false);
  assert.match(report.property.availability, /Unknown.*expired/);
  for (const source of evidence.sources) {
    const saved = report.sources.find(s => s.id === source.id);
    assert.equal(saved.url, source.url);
    assert.ok(saved.captured.includes(source.providerAcquiredAt || 'not supplied'));
  }
});

test('historical arithmetic agrees with reviewed evidence, including per-person fees', () => {
  const one = calculateCosts(report.costs, 1);
  assert.equal(one.net, 4729.26);
  assert.equal(one.monthly, 5057);
  assert.equal(one.upfront, 10004);
  const two = calculateCosts(report.costs, 2);
  assert.equal(two.monthly, 5122);
  assert.equal(two.upfront, 10024);
  assert.ok(one.unknowns.includes('Deposit-transfer terms'));
});

test('conflicts and failed official lookups retain their uncertainty', () => {
  assert.equal(report.findings.find(f => f.title === 'Conflicting pool claims').level, 'conflict');
  assert.equal(report.findings.find(f => f.title === 'Official record counts').level, 'unknown');
  assert.match(report.costs.note, /ORIGINAL 19-month/);
  assert.equal(report.costs.gross, evidence.listingClaims.grossMonthlyRentUsd);
  assert.notEqual(report.costs.gross, 4795);
});
