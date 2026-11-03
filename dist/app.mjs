import { examples } from './examples.mjs';
import { LABELS, validateReport, calculateCosts, budgetMessage } from './core.mjs';

const $ = id => document.getElementById(id);
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const money = value => value === null ? 'Unknown' : new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', maximumFractionDigits:2, minimumFractionDigits:0 }).format(value);
const reports = examples.map(validateReport);
const states = new Map();
let active = 0;
let filter = 'all';
const report = () => reports[active];
const state = () => {
  if (!states.has(active)) states.set(active, { budget:null, people:1, checked:new Set() });
  return states.get(active);
};
function notice(message) { $('notice').textContent = message; $('notice').hidden = false; }
function clearNotice() { $('notice').hidden = true; $('notice').textContent = ''; }
function renderLibrary() {
  $('case-list').innerHTML = reports.map((r, i) => `<button class="case-button" data-case="${i}" aria-current="${i === active}" aria-label="${escape(r.title)} — ${escape(r.scenario)}"><span class="case-top"><span class="case-index">${i < examples.length ? 'LISTING' : 'IMPORTED'} ${String(i+1).padStart(2,'0')}</span><span class="case-dot ${r.findings.some(f=>f.level==='conflict') ? 'conflicting' : r.costs.gross===null ? 'missing' : ''}" aria-hidden="true"></span></span><span class="case-arrow" aria-hidden="true">↗</span><span class="case-name">${escape(r.title)}</span><span class="case-scenario">${escape(r.scenario)}</span></button>`).join('');
}
function renderCosts() {
  const r = report(), s = state(), c = calculateCosts(r.costs, s.people);
  $('gross-rent').textContent = money(r.costs.gross);
  $('net-rent').textContent = money(c.net);
  $('monthly-total').textContent = money(c.monthly);
  $('upfront-total').textContent = money(c.upfront);
  $('cost-note').textContent = r.costs.note;
  $('unknown-costs').textContent = c.unknowns.length ? c.unknowns.join(' · ') : 'Confirm that the supplied schedule includes all charges.';
  $('budget-result').textContent = budgetMessage(c.monthly, s.budget, c.unknowns.length > 0);
  $('budget-result').classList.toggle('over', s.budget !== null && c.monthly !== null && c.monthly > s.budget);
}
function renderFindings() {
  const r = report(), findings = r.findings.map((f,i)=>({...f,index:i})).filter(f=>filter==='all'||f.level===filter);
  $('findings').innerHTML = findings.length ? findings.map(f => `<article class="finding"><span class="finding-badge ${f.level}">${LABELS[f.level]}</span><h3>${escape(f.title)}</h3><p>${escape(f.detail)}</p>${f.sourceIds.length ? `<button class="evidence-button" data-finding="${f.index}">View ${f.sourceIds.length} source${f.sourceIds.length>1?'s':''} <span aria-hidden="true">↗</span></button>` : '<span class="muted">No supporting source supplied</span>'}</article>`).join('') : `<p class="empty-findings">No ${filter === 'conflict' ? 'conflicting' : filter} findings in this report. Try another filter.</p>`;
  for (const button of document.querySelectorAll('[data-filter]')) button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
}
function renderQuestions() {
  $('questions').innerHTML = report().questions.map((q,i)=>`<label class="question"><input type="checkbox" data-question="${i}" ${state().checked.has(i)?'checked':''}><span>${escape(q)}</span></label>`).join('');
  updateQuestionProgress();
}
function updateQuestionProgress() { $('question-progress').textContent = `${state().checked.size} of ${report().questions.length} marked discussed · this session only`; }
function renderSources() {
  $('sources').innerHTML = report().sources.map((s,i)=>`<details id="source-${i}"><summary><span><span class="source-title">${String(i+1).padStart(2,'0')} &nbsp; ${escape(s.title)}</span><span class="source-type">${escape(s.type)}</span></span></summary><div class="source-body"><p>${escape(s.excerpt)}</p><small>${escape(s.captured)}</small>${s.url ? `<a href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">Open source ↗</a>` : '<small>Illustrative source created for this fictional example. No external record.</small>'}</div></details>`).join('') || '<p class="muted">No sources supplied. Findings cannot be treated as verified.</p>';
}
function render() {
  const r=report(), s=state();
  renderLibrary();
  $('case-number').textContent=String(active+1).padStart(2,'0');
  $('demo-text').textContent=r.fictional ? 'Fictional example. Illustrates the workflow; not a real listing or live search.' : `Real listing snapshot · researched ${r.prepared}. Availability is not confirmed; this viewer does not refresh listings.`;
  $('area').textContent=r.property.area;
  $('property-title').textContent=r.property.name;
  $('property-meta').textContent=`Unit ${r.property.unit}  /  ${r.property.layout}`;
  $('report-date').textContent=r.prepared;
  $('source-count').textContent=`${r.sources.length} supplied sources`;
  $('verdict-title').textContent=r.verdict;
  $('verdict-summary').textContent=r.summary;
  $('availability').textContent=r.property.availability;
  $('sources-caption').textContent=r.fictional ? 'Illustrative documents only' : 'Review freshness and identity';
  $('budget').value=s.budget??'';
  $('people').value=String(s.people);
  $('coverage-counts').innerHTML=Object.entries(LABELS).map(([level,label])=>`<div class="coverage-row"><span><span class="label-dot ${level}" aria-hidden="true"></span>${label}</span><strong>${r.findings.filter(f=>f.level===level).length}</strong></div>`).join('');
  $('copy-button').disabled=!r.questions.length;
  renderCosts(); renderFindings(); renderQuestions(); renderSources();
}
function download(r) {
  const blob=new Blob([JSON.stringify(r,null,2)+'\n'],{type:'application/json'});
  const url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url; a.download=`${r.id.replace(/[^a-z0-9_-]/gi,'-')}.report.json`; document.body.append(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
$('case-list').addEventListener('click',event=>{
  const button=event.target.closest('[data-case]'); if(!button)return;
  active=Number(button.dataset.case); filter='all'; clearNotice(); render();
  $('property-title').setAttribute('tabindex','-1'); $('property-title').focus({preventScroll:true});
});
document.querySelector('.filter-row').addEventListener('click',event=>{const button=event.target.closest('[data-filter]');if(button){filter=button.dataset.filter;renderFindings();}});
$('findings').addEventListener('click',event=>{
  const button=event.target.closest('[data-finding]');if(!button)return;
  const indexes=report().findings[Number(button.dataset.finding)].sourceIds.map(id=>report().sources.findIndex(s=>s.id===id));
  indexes.forEach(i=>$(`source-${i}`).open=true);
  const target=$(`source-${indexes[0]}`);target.scrollIntoView({behavior:'auto',block:'center'});target.querySelector('summary').focus({preventScroll:true});
});
$('questions').addEventListener('change',event=>{const box=event.target;if(!box.matches('[data-question]'))return;const index=Number(box.dataset.question);if(box.checked)state().checked.add(index);else state().checked.delete(index);updateQuestionProgress();});
$('budget').addEventListener('input',()=>{const v=$('budget').value;state().budget=v!==''&&$('budget').validity.valid?Number(v):null;renderCosts();});
$('people').addEventListener('change',()=>{state().people=Number($('people').value);renderCosts();});
$('reset-button').addEventListener('click',()=>{states.delete(active);filter='all';clearNotice();render();});
$('export-button').addEventListener('click',()=>download(report()));
$('download-example').addEventListener('click',()=>download(reports[0]));
for(const id of ['import-button','mobile-import'])$(id).addEventListener('click',()=>$('file-input').click());
$('file-input').addEventListener('change',async()=>{
  const file=$('file-input').files[0]; if(!file)return;
  try {
    if(file.size>1024*1024)throw new Error('This file is too large. Choose a JSON report smaller than 1 MB.');
    if(reports.length>=13)throw new Error('This session has ten imported reports. Refresh the page to start a new session.');
    let parsed;try{parsed=JSON.parse(await file.text());}catch{throw new Error('This file is not valid JSON. Export an example report to see the expected format.');}
    reports.push(validateReport(parsed));active=reports.length-1;filter='all';clearNotice();render();
    notice('Report imported locally. Review its source dates and evidence before relying on its claims.');
    $('report').scrollIntoView({block:'start'});
  }catch(error){notice(`Could not import report. ${error.message}`);$('notice').scrollIntoView({block:'center'});}
  finally{$('file-input').value='';}
});
$('about-button').addEventListener('click',()=>$('about-dialog').showModal());
$('copy-button').addEventListener('click',async()=>{
  const text=`${report().title} — questions to confirm\n\n`+report().questions.map((q,i)=>`${i+1}. ${q}`).join('\n\n');
  try{await navigator.clipboard.writeText(text);$('copy-button').textContent='Questions copied ✓';setTimeout(()=>$('copy-button').innerHTML='Copy questions <span aria-hidden="true">↗</span>',1800);}
  catch{$('copy-text').value=text;$('copy-dialog').showModal();$('copy-text').select();}
});
render();

$('analyze-form').addEventListener('submit',async event=>{
  event.preventDefault();const button=$('analyze-button');button.disabled=true;
  $('analyze-status').textContent='Reading listing and preparing report…';
  try{
    if(reports.length>=13)throw Error('Refresh to start a new report session.');
    const response=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+$('demo-token').value},body:JSON.stringify({url:$('listing-url').value,text:$('listing-text').value})});
    const data=await response.json();if(!response.ok)throw Error(data.error||'Analysis unavailable.');
    reports.push(validateReport(data.report));active=reports.length-1;filter='all';clearNotice();render();
    $('analyze-status').textContent='Report ready. Review the evidence and unknowns.';$('report').scrollIntoView({block:'start'});
  }catch(error){$('analyze-status').textContent=error.message;}
  finally{button.disabled=false;}
});

fetch('/api/capabilities').then(r=>r.ok?r.json():null).then(c=>{if(c?.liveAnalysis){$('analyze-form').hidden=false;$('public-demo-note').hidden=true;}}).catch(()=>{});
