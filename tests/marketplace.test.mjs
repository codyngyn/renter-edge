import test from 'node:test';
import assert from 'node:assert/strict';
import {examples} from '../dist/examples.mjs';
import {validateReport,calculateCosts} from '../dist/core.mjs';
test('built-in reports are real dated marketplace snapshots with valid source references',()=>{
  assert.equal(examples.length,3);
  for(const r of examples){
    assert.deepEqual(validateReport(r),r);assert.equal(r.fictional,false);
    assert.match(r.property.availability,/not independently confirmed/);
    assert.ok(r.sources.every(s=>s.url.startsWith('https://www.renthop.com/')&&s.captured.includes('Nov 2, 2026')));
    assert.equal(calculateCosts(r.costs).net,null);
    assert.equal(r.costs.deposit,null);assert.equal(r.costs.amenity,null);
  }
});
test('conflicting marketplace price is not silently chosen for the calculator',()=>{
  const r=examples[1];assert.equal(r.property.unit,'3V');
  assert.equal(r.costs.gross,null);assert.equal(calculateCosts(r.costs).monthly,null);
  assert.equal(calculateCosts(r.costs).upfront,null);
  assert.ok(r.findings.some(f=>f.level==='conflict'));
  assert.equal(examples[0].costs.gross,3430);assert.equal(examples[2].costs.gross,2995);
});
