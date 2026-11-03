import test from 'node:test';
import assert from 'node:assert/strict';
import {liveEnabled,authorized} from '../access.mjs';
test('public mode denies live access even with provider keys',()=>{
 const env={OPENAI_API_KEY:'present',PARALLEL_API_KEY:'present',RENTER_EDGE_DEMO_TOKEN:'a'.repeat(32)};
 assert.equal(liveEnabled(env),false);assert.equal(authorized('Bearer '+env.RENTER_EDGE_DEMO_TOKEN,env),false);
});
test('private mode requires explicit enablement and matching strong token',()=>{
 const env={RENTER_EDGE_LIVE:'true',RENTER_EDGE_DEMO_TOKEN:'a'.repeat(32)};
 assert.equal(liveEnabled(env),true);assert.equal(authorized('Bearer '+env.RENTER_EDGE_DEMO_TOKEN,env),true);
 for(const header of [undefined,'','Bearer wrong'])assert.equal(authorized(header,env),false);
 assert.equal(liveEnabled({...env,RENTER_EDGE_DEMO_TOKEN:'short'}),false);
});
