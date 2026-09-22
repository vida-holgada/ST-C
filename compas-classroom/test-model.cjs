const assert=require('node:assert/strict');const M=require('./model.js'),D=require('./data.js'),r=M.records(D);
assert.equal(r.length,500);assert.equal(r.filter(p=>p.rearrested).length,230);
let m=M.metrics(r,6);assert.deepEqual([m.tp,m.tn,m.fp,m.fn],[133,211,59,97]);assert.equal(m.accuracy,.688);
assert.equal(M.metrics(r,7,true).accuracy,1);assert.deepEqual(M.bestThresholds(r).map(x=>x.k),[6]);
for(let k=1;k<=11;k++){const a=M.metrics(r,k);assert.equal(a.tp+a.tn+a.fp+a.fn,500);assert.equal(a.fp+a.tn,270);assert.equal(a.tp+a.fn,230);if(k>1){const b=M.metrics(r,k-1);assert(a.fp<=b.fp);assert(a.fn>=b.fn);assert(a.high<=b.high);}for(let g of ['white','black']){const q=M.metrics(r.filter(p=>p.group===g),k);assert.equal(q.n,g==='white'?198:302);assert(q.fpr>=0&&q.fpr<=1);assert(q.fnr>=0&&q.fnr<=1);}}
assert.equal(M.metrics(r,1).fpr,1);assert.equal(M.metrics(r,1).fnr,0);assert.equal(M.metrics(r,11).fpr,0);assert.equal(M.metrics(r,11).fnr,1);
assert.equal(M.metrics(r.filter(p=>p.group==='white'),7).fp,12);assert.equal(M.metrics(r.filter(p=>p.group==='black'),9).fp,11);
console.log('PASS: 500 records, reference counts, all thresholds, ideal case, group denominators, extremes');
