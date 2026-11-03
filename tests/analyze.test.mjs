import test from 'node:test';
import assert from 'node:assert/strict';
import {parseInput,analyze} from '../analyze.mjs';
import {examples} from './fixtures/fictional.mjs';
const url='https://www.renthop.com/listings/example/1/123';
test('URL input rejects arbitrary hosts and credentials',()=>{
 for(const u of ['http://127.0.0.1','https://renthop.com.evil.test/listings/a','https://user:pass@renthop.com/listings/a','https://renthop.com/search'])assert.throws(()=>parseInput({url:u}));
 assert.equal(parseInput({url:url+'?tracking=1'}).url,url);
 assert.throws(()=>parseInput({url,text:'x'.repeat(20001)}));
});
test('missing configuration makes no paid requests',async()=>{
 await assert.rejects(analyze({url},{},()=>{throw Error('must not call');}),/not configured/);
});
test('pasted text produces a validated report with server-owned provenance',async()=>{
 let calls=0;
 const result=await analyze({url,text:'Untrusted apartment description'},{OPENAI_API_KEY:'test',OPENAI_MODEL:'test'},async(endpoint,options)=>{
 calls++;assert.equal(endpoint,'https://api.openai.com/v1/responses');
 const body=JSON.parse(options.body);assert.match(body.input,/json/i);assert.equal(body.store,false);assert.equal(body.tools,undefined);
 const r=structuredClone(examples[2]);r.sources[0].url='https://invented.test';r.property.layout=null;
 return {ok:true,json:async()=>({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify(r)}]}]})};
 });
 assert.equal(result.property.layout,'Unknown');assert.equal(calls,1);assert.equal(result.sources[0].url,url);assert.equal(result.fictional,false);assert.match(result.sources[0].type,/pasted/);
});
test('failed extraction offers text fallback without calling model',async()=>{
 let calls=0;await assert.rejects(analyze({url},{OPENAI_API_KEY:'test',OPENAI_MODEL:'test',PARALLEL_API_KEY:'test'},async()=>{calls++;return {ok:true,json:async()=>({results:[]})};}),/Paste the listing/);assert.equal(calls,1);
});

test('exhausted API credits produces actionable billing error',async()=>{
 await assert.rejects(analyze({url,text:'Listing description'},{OPENAI_API_KEY:'test',OPENAI_MODEL:'test'},async()=>({ok:false,status:429,json:async()=>({error:{code:'insufficient_quota'}})})),/OpenAI API credits.*billing/);
});
