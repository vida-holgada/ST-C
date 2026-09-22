/* A threshold k means score >= k is classified high risk. k=11 means none. */
(function(root){
 function records(data){let rows=[]; for(const group of ['white','black']) data[group].forEach((pair,i)=>pair.forEach((n,j)=>{for(let k=0;k<n;k++)rows.push({id:rows.length,score:i+1,group,rearrested:j===0});}));return rows;}
 function metrics(rows,threshold,ideal=false){let tp=0,tn=0,fp=0,fn=0;for(const p of rows){let actual=ideal?p.score>=7:p.rearrested;let high=p.score>=threshold;if(high&&actual)tp++;else if(high)fp++;else if(actual)fn++;else tn++;}const n=rows.length;return {tp,tn,fp,fn,n,positive:tp+fn,negative:tn+fp,high:tp+fp,low:tn+fn,accuracy:(tp+tn)/n,fpr:fp/(fp+tn),fnr:fn/(fn+tp)};}
 function bestThresholds(rows,ideal=false){const all=Array.from({length:11},(_,i)=>({k:i+1,...metrics(rows,i+1,ideal)}));const best=Math.max(...all.map(x=>x.accuracy));return all.filter(x=>x.accuracy===best);}
 const api={records,metrics,bestThresholds}; if(typeof module!=='undefined')module.exports=api;else root.CompasModel=api;
})(typeof window==='undefined'?globalThis:window);
